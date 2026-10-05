from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.orchestrator import LLMOrchestrator
from core.capital import CapitalTracker
from core.autokill import AutoKillGuard
from config import settings

app = FastAPI(title="Robin Orchestrator API")

# Allow React Frontend Connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global State
capital_tracker = CapitalTracker(initial_capital=1000.0)
guard = AutoKillGuard(capital_tracker)
orchestrator = LLMOrchestrator()

@app.get("/api/status")
def get_status():
    current_return = capital_tracker.calculate_daily_return()
    return {
        "status": "ACTIVE" if guard.daily_infra_cost < settings.MAX_DAILY_INFRA_COST_USD else "AUTO_KILLED",
        "primary_model": settings.PRIMARY_MODEL,
        "fallback_models": settings.FALLBACK_MODELS,
        "initial_capital": capital_tracker.initial_capital,
        "current_capital": capital_tracker.current_capital,
        "daily_roi_percent": round(current_return * 100, 2),
        "target_roi_percent": round(settings.TARGET_DAILY_COMPOUNDING * 100, 2),
        "infra_cost_usd": guard.daily_infra_cost,
        "max_infra_cost_usd": settings.MAX_DAILY_INFRA_COST_USD,
        "max_drawdown_limit_percent": round(settings.MAX_DRAWDOWN_LIMIT * 100, 2)
    }

@app.post("/api/query")
def query_orchestrator(payload: dict):
    prompt = payload.get("prompt", "Analyze system health")
    try:
        guard.check_drawdown()
        guard.check_infra_limit()
        
        # Execute query via OpenRouter
        response_text = orchestrator.query(prompt)
        
        # Simulate positive compounding update upon successful execution
        new_balance = capital_tracker.current_capital * 1.07
        capital_tracker.update_capital(new_balance)
        guard.add_infra_cost(0.15) # Add estimated execution cost
        
        return {
            "success": True,
            "response": response_text,
            "new_capital": capital_tracker.current_capital,
            "daily_roi": round(capital_tracker.calculate_daily_return() * 100, 2)
        }
    except Exception as e:
        return {"success": False, "error": str(e)}