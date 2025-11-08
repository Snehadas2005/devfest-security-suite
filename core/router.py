"""
core/router.py
Routing logic for the AI security toolkit.
Decides which tool to call and invokes it.
This version returns the chosen tool name together with the tool result.
"""

import logging
from core.utils.gemini_utils import call_gemini

# import your tools
from core.tools.phishing_detector import analyze_phishing
from core.tools.vuln_scanner import analyze_vuln
# from core.tools.config_risk import analyze_config
# from core.tools.classifier import analyze_classify

logger = logging.getLogger("Router")

def choose_tool(user_query: str) -> str:
    """
    Ask Gemini to pick a tool. Returns one of: phishing, vuln, config, classify.
    If the model output is unclear, fall back to simple heuristics.
    """
    prompt = f"""
You are a routing agent for a cybersecurity toolkit.
Available tools:
- phishing: analyze suspicious emails/messages
- vuln: analyze code snippets for static vulnerabilities
- config: analyze config files for secrets/misconfigurations
- classify: final label (safe/suspicious/high-risk)

Return only the single word name of the best tool: phishing, vuln, config, or classify.

User request:
\"\"\"{user_query}\"\"\"
"""
    result = call_gemini(prompt, temperature=0.0, max_tokens=40)
    if not isinstance(result, str):
        result = str(result)
    tool = result.lower().strip().split()[0] if result else ""

    # map explicit words and heuristics to tool names
    lower_q = user_query.lower()
    if "scan" in lower_q and "code" in lower_q:
        return "vuln"
    if "code" in lower_q and ("vulnerab" in lower_q or "sql" in lower_q or "injection" in lower_q):
        return "vuln"
    if "config" in lower_q or "secret" in lower_q or "policy" in lower_q or "iam" in lower_q:
        return "config"
    if "phish" in tool or "email" in lower_q or "click" in lower_q:
        return "phishing"
    if "class" in tool or "label" in lower_q or "confidence" in lower_q:
        return "classify"

    # fallback to the model reply if it clearly names a tool
    if tool in {"phishing", "vuln", "config", "classify"}:
        return tool

    # default to phishing
    return "phishing"


def route_query(user_query: str) -> dict:
    """
    Route the user's query to the chosen tool and return a structure:
    { "tool": "<tool-name>", "result": <tool-output-or-error> }
    """
    tool = choose_tool(user_query)
    logger.info("Router selected tool: %s for query: %.120s", tool, user_query)

    if tool == "phishing":
        try:
            result = analyze_phishing(user_query)
        except Exception as e:
            logger.exception("Error in phishing tool: %s", e)
            result = {"error": str(e)}
        return {"tool": "phishing", "result": result}

    elif tool == "vuln":
        try:
            result = analyze_vuln(user_query)
        except Exception as e:
            logger.exception("Error in vuln tool: %s", e)
            result = {"error": str(e)}
        return {"tool": "vulnerability_scannner", "result": result}

    elif tool == "config":
        # placeholder until implemented
        try:
            # result = analyze_config(user_query)
            result = {"error": "config tool not implemented yet"}
        except Exception as e:
            logger.exception("Error in config tool: %s", e)
            result = {"error": str(e)}
        return {"tool": "config", "result": result}

    elif tool == "classify":
        # placeholder until implemented
        try:
            # result = analyze_classify(user_query)
            result = {"error": "classify tool not implemented yet"}
        except Exception as e:
            logger.exception("Error in classify tool: %s", e)
            result = {"error": str(e)}
        return {"tool": "classify", "result": result}

    else:
        logger.warning("Router returned unknown tool: %s. Defaulting to phishing.", tool)
        try:
            result = analyze_phishing(user_query)
        except Exception as e:
            logger.exception("Error in fallback phishing tool: %s", e)
            result = {"error": str(e)}
        return {"tool": "phishing", "result": result}
