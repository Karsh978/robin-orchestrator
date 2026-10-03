import os
from dotenv import load_dotenv

# .env file se variables load karega
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

PRIMARY_MODEL = "meta-llama/llama-3.1-70b-instruct"
FALLBACK_MODELS = [
    "mistralai/mistral-large",
    "google/gemini-flash-1.5"
]

TARGET_DAILY_COMPOUNDING = 0.06
MAX_DRAWDOWN_LIMIT = 0.05
MAX_DAILY_INFRA_COST_USD = 10.0