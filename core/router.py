"""
core/router.py
Routing logic for the AI security toolkit.
Decides which tool to call and invokes it.
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

    # map explicit words to tool names
    if "vuln" in tool or "code" in tool or "scan" in user_query.lower() and "code" in user_query.lower():
        return "vuln"
    if "config" in tool or "secret" in user_query.lower() or "policy" in user_query.lower():
        return "config"
    if "phish" in tool or "email" in user_query.lower() or "click" in user_query.lower():
        return "phishing"
    if "class" in tool or "label" in user_query.lower():
        return "classify"

    # fallback: try to interpret the model's single-word reply
    if tool in {"phishing", "vuln", "config", "classify"}:
        return tool

    # default to phishing if uncertain
    return "phishing"


def route_query(user_query: str):
    """Route the user's query to the chosen tool and return its result."""
    tool = choose_tool(user_query)
    logger.info("Router selected tool: %s for query: %.60s", tool, user_query)

    if tool == "phishing":
        return analyze_phishing(user_query)
    elif tool == "vuln":
        return analyze_vuln(user_query)
    elif tool == "config":
        # return analyze_config(user_query)
        return {"error": "config tool not implemented yet"}
    elif tool == "classify":
        # return analyze_classify(user_query)
        return {"error": "classify tool not implemented yet"}
    else:
        return {"error": f"No handler implemented for tool '{tool}'"}
