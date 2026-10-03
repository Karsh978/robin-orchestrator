# Robin Autonomous AI Orchestrator

Robin is an autonomous AI orchestrator engineered for capital compounding, dynamic multi-LLM model fallback routing, and automated safety guardrails. Built as a core component of the **City of Shadows** ecosystem.

## Key Features

- **Dynamic LLM Orchestration**: Primary routing via OpenRouter with automatic fallback traversing across models (`meta-llama/llama-3.1-70b-instruct`, `mistralai/mistral-large`, `google/gemini-flash-1.5`) in case of rate limits or model failures.
- **Capital Compounding Engine**: Tracks daily ROI against a strict **6%+ daily compounding target**.
- **Auto-Kill Safety Protocols**: Continuous risk monitoring that halts system execution upon max drawdown breaches or infrastructure cost budget caps.
- **Secure Environment Management**: `.env` configuration integration with gitignore protection to keep credentials safe.

---

## Architecture Overview

text
robin-orchestrator/
├── config/
│   └── settings.py       # Configuration, model slugs, thresholds, env loader
├── core/
│   ├── orchestrator.py   # OpenRouter API wrapper & dynamic model fallback logic
│   ├── capital.py        # 6%+ daily compounding & ROI tracking engine
│   └── autokill.py       # Safety loop for drawdown & infra cost enforcement
├── .env                  # API keys and environment secrets (Git-ignored)
├── .gitignore            # Excludes sensitive environment files & cache
├── main.py               # Main pipeline execution entry point
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation

Quick Start Guide
1. Prerequisites
Python 3.9+

OpenRouter API Key ```

2. Installation
Clone the repository and install dependencies:

Bash
git clone [https://github.com/Karsh978/robin-orchestrator.git](https://github.com/Karsh978/robin-orchestrator.git)
cd robin-orchestrator
pip install -r requirements.txt
3. Environment Setup
Create a .env file in the root directory and add your OpenRouter API key:

Code snippet
OPENROUTER_API_KEY=your_openrouter_api_key_here
4. Running the Orchestrator
Execute the main entry point to initiate the Robin monitoring loop:

Bash
python main.py
Safety Guardrails & Thresholds
Daily Compounding Target: 6%

Max Drawdown Limit: 5% (Triggers AutoKillGuard halt)

Daily Infra Cost Cap: $10.00 USD (Triggers AutoKillGuard halt)


---

