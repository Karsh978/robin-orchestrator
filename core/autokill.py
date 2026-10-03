import sys
from config import settings

class AutoKillGuard:
    def __init__(self, capital_tracker):
        self.tracker = capital_tracker
        self.daily_infra_cost = 0.0

    def add_infra_cost(self, cost):
        self.daily_infra_cost += cost
        self.check_infra_limit()

    def check_infra_limit(self):
        if self.daily_infra_cost >= settings.MAX_DAILY_INFRA_COST_USD:
            self.trigger_kill(f"Infra cost limit exceeded (${self.daily_infra_cost})")

    def check_drawdown(self):
        current_return = self.tracker.calculate_daily_return()
        if current_return <= -settings.MAX_DRAWDOWN_LIMIT:
            self.trigger_kill(f"Max drawdown breach: {current_return * 100:.2f}%")

    def trigger_kill(self, reason):
        print(f"\n🚨 [AUTO-KILL PROTOCOL ACTIVATED] 🚨")
        print(f"Reason: {reason}")
        print("System halted to safeguard capital and infrastructure costs.")
        sys.exit(1)