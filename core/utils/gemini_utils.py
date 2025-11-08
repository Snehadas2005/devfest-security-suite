"""
core/gemini_utils.py
Reliable Gemini API utility for the security suite backend.
"""

import os
import json
import logging
from dotenv import load_dotenv
import google.generativeai as genai

# -----------------------------------------------------------------------------
# 1. Load environment variables
# -----------------------------------------------------------------------------
load_dotenv()  # loads variables from core/.env

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

if not API_KEY:
    raise RuntimeError("❌ Missing GEMINI_API_KEY in .env (core folder)")

# -----------------------------------------------------------------------------
# 2. Configure Gemini client
# -----------------------------------------------------------------------------
genai.configure(api_key=API_KEY)

# -----------------------------------------------------------------------------
# 3. Logging setup
# -----------------------------------------------------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("GeminiUtils")

# -----------------------------------------------------------------------------
# 4. Core helper function
# -----------------------------------------------------------------------------
def call_gemini(
    prompt: str,
    model: str = MODEL,
    temperature: float = 0.2,
    max_tokens: int = 800,
    expect_json: bool = False,
):
    """
    Calls Gemini with the provided prompt.
    Safely handles missing text, finish_reason, and JSON responses.
    """
    try:
        model_obj = genai.GenerativeModel(model)
        response = model_obj.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=temperature,
                max_output_tokens=max_tokens,
                candidate_count=1,
            ),
        )

        # Handle null / empty response
        if not response:
            return {"error": "Empty response (no candidates returned)"}

        # Handle finish reason and content
        if not hasattr(response, "candidates") or not response.candidates:
            return {"error": "No candidates in response."}

        candidate = response.candidates[0]

        # If safety or blocked
        if hasattr(candidate, "finish_reason") and candidate.finish_reason != 1:
            reason = candidate.finish_reason
            logger.warning(f"⚠️ Generation stopped early (finish_reason={reason})")
            # Try to salvage text from parts if possible
            if hasattr(candidate, "content") and candidate.content.parts:
                text_parts = [p.text for p in candidate.content.parts if hasattr(p, "text")]
                output_text = "\n".join(text_parts).strip()
                if output_text:
                    return output_text
            return {"error": f"Stopped early (finish_reason={reason})"}

        # Normal case: extract text safely
        if hasattr(response, "text") and response.text:
            output_text = response.text.strip()
        else:
            # fallback: combine candidate parts
            text_parts = [p.text for p in candidate.content.parts if hasattr(p, "text")]
            output_text = "\n".join(text_parts).strip()

        if not output_text:
            return {"error": "Response had no text content."}

        # Optional JSON parsing
        if expect_json:
            try:
                start, end = output_text.find("{"), output_text.rfind("}")
                if start != -1 and end != -1:
                    json_str = output_text[start : end + 1]
                    return json.loads(json_str)
            except json.JSONDecodeError as e:
                logger.warning(f"⚠️ JSON parse failed: {e}")
                return {"raw_output": output_text}

        return output_text

    except Exception as e:
        logger.error(f"❌ Gemini API call failed: {e}")
        return {"error": str(e)}

# -----------------------------------------------------------------------------
# 5. Quick self-test
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    print("🔍 Testing Gemini connection...\n")

    prompt = """
You are a cybersecurity expert.

Task: Generate a clear, short paragraph explaining why phishing awareness is
crucial in corporate environments, and then list exactly 3 key practices to
avoid phishing emails. Make sure to respond in plain text only.
"""

    result = call_gemini(prompt)
    print("✅ Result:\n", result)

