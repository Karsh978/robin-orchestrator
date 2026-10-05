import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Standard production models on OpenRouter
PRIMARY_MODEL = "meta-llama/llama-3.1-70b-instruct"
FALLBACK_MODELS = [
    "mistralai/mistral-7b-instruct",
    "google/gai-studio-models"  # Or standard router model
]

TARGET_DAILY_COMPOUNDING = 0.06
MAX_DRAWDOWN_LIMIT = 0.05
MAX_DAILY_INFRA_COST_USD = 10.0