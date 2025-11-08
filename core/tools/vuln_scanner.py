"""
core/tools/vuln_scanner.py
Static vulnerability scanner using Gemini API.
Now with robust JSON retry, repair, and completion handling.
"""

import json
import logging
from typing import Dict, Any
from core.utils.gemini_utils import call_gemini, MODEL

logger = logging.getLogger("VulnScanner")

# -----------------------------------------------------------------------------
# Prompt Template (escaped braces)
# -----------------------------------------------------------------------------
PROMPT_TEMPLATE = """
You are a senior application security analyst performing a static vulnerability scan on a given code snippet.

Return ONLY valid JSON (no markdown, no explanation) following exactly this schema:
{{
  "issues": [
    {{
      "line": <line_number_or_null>,
      "severity": "critical" | "high" | "medium" | "low",
      "type": "injection|auth|crypto|unsafe_deserialization|info_leak|hardcoded_secret|other",
      "description": "short explanation (1 sentence)",
      "suggestion": "short fix recommendation (1 sentence)"
    }}
  ],
  "summary": "1-2 sentence summary of the most important issues"
}}

Code language: {language}
Code:
\"\"\"{code}\"\"\"
"""

RECOVERY_PROMPT = """
Your previous response was incomplete or truncated.
Please re-output ONLY a fully valid JSON object matching the schema above.
Do NOT include markdown or extra commentary — only raw JSON.
"""

# -----------------------------------------------------------------------------
# Helper to safely extract JSON text
# -----------------------------------------------------------------------------
def _extract_json_from_text(text: str) -> Dict[str, Any] | None:
    """
    Safely extract the first valid JSON object from model output.
    Uses brace counting to find complete JSON.
    """
    if not text or not isinstance(text, str):
        return None

    start = text.find("{")
    if start == -1:
        return None

    depth = 0
    json_str = ""
    for ch in text[start:]:
        json_str += ch
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                break

    try:
        return json.loads(json_str)
    except json.JSONDecodeError:
        # Fallback: strip markdown or code fences
        cleaned = (
            text.replace("```json", "")
            .replace("```", "")
            .strip()
        )
        try:
            return json.loads(cleaned)
        except Exception:
            return None

# -----------------------------------------------------------------------------
# Core function
# -----------------------------------------------------------------------------
def analyze_vuln(code: str, language: str = "auto") -> Dict[str, Any]:
    """Analyze a code snippet for static vulnerabilities using Gemini."""
    prompt = PROMPT_TEMPLATE.format(language=language, code=code)

    # 1️⃣ Primary call
    primary = call_gemini(prompt, model=MODEL, temperature=0.0, max_tokens=700, expect_json=False)
    text_output = primary if isinstance(primary, str) else str(primary)

    parsed = _extract_json_from_text(text_output)
    if parsed:
        parsed.setdefault("issues", [])
        parsed.setdefault("summary", "")
        return parsed

    # 2️⃣ Detect if truncated / incomplete JSON
    if text_output.strip().endswith("{") or text_output.strip().endswith("[") or len(text_output) < 100:
        logger.warning("⚠️ Incomplete or truncated response detected, retrying with gemini-2.5-pro...")
        retry_prompt = prompt + "\n" + RECOVERY_PROMPT
        retry = call_gemini(retry_prompt, model="gemini-2.5-pro", temperature=0.0, max_tokens=1200)
        retry_text = retry if isinstance(retry, str) else str(retry)
        parsed_retry = _extract_json_from_text(retry_text)
        if parsed_retry:
            return parsed_retry

    # 3️⃣ Last fallback
    logger.error("⚠️ Could not parse JSON output from Gemini")
    return {"raw_output": text_output[:400]}  # Truncate for readability


# -----------------------------------------------------------------------------
# Self-test
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    sample_code = '''
import os
password = "P@ssw0rd!"
user_input = input("id:")
query = "SELECT * FROM users WHERE id = %s" % user_input
cursor.execute(query)
'''
    print("🔍 Testing vuln scanner...")
    result = analyze_vuln(sample_code, language="python")
    print(json.dumps(result, indent=2))
