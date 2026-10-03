import requests
from config import settings

class LLMOrchestrator:
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY
        self.models = [settings.PRIMARY_MODEL] + settings.FALLBACK_MODELS

    def query(self, prompt):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": "https://github.com/Karsh978/robin-orchestrator", # Required by OpenRouter
            "X-Title": "Robin Autonomous Orchestrator", # Required by OpenRouter
            "Content-Type": "application/json"
        }
        
        for model in self.models:
            print(f"[Orchestrator] Attempting request using model: {model}")
            payload = {
                "model": model,
                "messages": [{"role": "user", "content": prompt}]
            }
            try:
                response = requests.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=30
                )
                if response.status_code == 200:
                    return response.json()['choices'][0]['message']['content']
                
                print(f"[Warning] Model {model} failed with status {response.status_code}. Response: {response.text[:100]}. Trying fallback...")
            except Exception as e:
                print(f"[Error] Exception on {model}: {e}. Swapping to fallback...")

        raise Exception("All configured orchestration models failed to respond.")