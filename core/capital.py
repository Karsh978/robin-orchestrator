from config import settings

class CapitalTracker:
    def __init__(self, initial_capital):
        self.initial_capital = initial_capital
        self.current_capital = initial_capital
        self.target_rate = settings.TARGET_DAILY_COMPOUNDING

    def update_capital(self, current_balance):
        self.current_capital = current_balance

    def calculate_daily_return(self):
        return (self.current_capital - self.initial_capital) / self.initial_capital

    def is_target_met(self):
        return self.calculate_daily_return() >= self.target_rate