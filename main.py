import time
from core.orchestrator import LLMOrchestrator
from core.capital import CapitalTracker
from core.autokill import AutoKillGuard

def main():
    print("=== Initializing Robin Autonomous AI Orchestrator ===")
    
    # Initialize Core Engines
    orchestrator = LLMOrchestrator()
    capital_tracker = CapitalTracker(initial_capital=1000.0)  # Example $1000 starting capital
    guard = AutoKillGuard(capital_tracker)

    print("Robin is active and monitoring...")

    # Simulated Execution Loop
    try:
        # Check safety guardrails before execution
        guard.check_drawdown()
        guard.check_infra_limit()

        # Orchestration Example Query
        response = orchestrator.query("Analyze current system status and optimize capital allocation.")
        print(f"[Robin Orchestrator Output]: {response}")

        # Example Capital Update (Simulated +7% return)
        capital_tracker.update_capital(1070.0)
        print(f"Current Daily ROI: {capital_tracker.calculate_daily_return() * 100:.2f}%")

        if capital_tracker.is_target_met():
            print("🎯 Daily 6%+ compounding target achieved successfully!")

    except Exception as e:
        print(f"Execution Error: {e}")

if __name__ == "__main__":
    main()