# ResearchMind — Full Stack Multi-Agent AI System 🔬

> A modern Full Stack AI application powered by **FastAPI** (Python backend), **React** (Vite + Tailwind CSS), and **LangChain**. Automates web research, deep article scraping, report synthesis, and peer review using 4 specialized AI agents.

---

## 🌟 Key Features

- 🤖 **4-Stage Multi-Agent Architecture**: Dedicated Search Agent, Reader Agent, Writer Chain, and Critic Chain.
- 🚀 **FastAPI Backend**: Clean REST endpoints with Pydantic validation, background task execution, and SQLite persistence.
- 🎨 **Modern React UI (JavaScript)**: Glassmorphic dark UI with live step-by-step progress tracking, agent trace expanders, report downloading, and history search.
- 💾 **Lightweight SQLite History**: Automatically saves completed research reports for offline retrieval and analysis.
- ⚡ **Zero Over-Engineering**: Completely self-contained without Redis, Kafka, Kubernetes, or complex microservice setup.

---

## 🏗️ Architecture & Execution Flow

```text
React Frontend (Vite) ──► Axios HTTP ──► FastAPI REST API ──► Research Service ──► Multi-Agent Pipeline ──► SQLite Database
```

### Pipeline Workflow:
1. **Search Agent**: Queries Tavily API for top 5 web results & snippets.
2. **Reader Agent**: Scrapes and extracts full text content from target web source using BeautifulSoup.
3. **Writer Chain**: Synthesizes structured markdown research report (Intro, 3 Key Findings, Conclusion, Sources).
4. **Critic Chain**: Evaluates report quality, outputting a numerical score out of 10, strengths, and recommendations.

---

## 📁 Repository Structure

```text
Multi-agent-research-system-main/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI routes (/health, /research, /history, /report)
│   │   ├── agents/       # Search and Reader agent factories
│   │   ├── chains/       # Writer and Critic LCEL chains
│   │   ├── tools/        # Tavily Search & BeautifulSoup scraper tools
│   │   ├── services/     # Research pipeline manager & SQLite db service
│   │   ├── schemas/      # Pydantic request/response schemas
│   │   ├── core/         # Logging configuration
│   │   ├── config.py     # Centralized settings & environment validation
│   │   └── main.py       # FastAPI application entrypoint
│   └── requirements.txt  # Python backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, Sidebar, SearchBox, ProgressTimeline, MarkdownViewer, etc.
│   │   ├── pages/        # Home, Research, History, ReportViewer, About
│   │   ├── hooks/        # useResearch (pipeline trigger & polling hook)
│   │   ├── services/     # Axios API client
│   │   ├── layouts/      # MainLayout wrapper
│   │   ├── App.jsx       # React Router setup
│   │   └── main.jsx      # Vite React entrypoint
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## 🔌 API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check and environment validation status |
| `POST` | `/api/research` | Initiate a new research pipeline task |
| `GET` | `/api/research/{id}` | Poll live task progress & intermediate outputs |
| `GET` | `/api/history` | Fetch all historical reports from SQLite storage |
| `GET` | `/api/report/{id}` | Retrieve single report detail by ID |
| `DELETE` | `/api/report/{id}` | Delete a report by ID |

---

## 🔑 Environment Variables Setup

Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

---

## ⚡ Quickstart Guide

### 1. Run Backend (FastAPI)
```bash
# Navigate to backend
cd backend

# Create & activate virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m app.main
# Server starts at http://127.0.0.1:8000 (Swagger docs at http://127.0.0.1:8000/docs)
```

### 2. Run Frontend (React / Vite)
```bash
# Navigate to frontend
cd frontend

# Install npm dependencies
npm install

# Start Vite dev server
npm run dev
# App starts at http://localhost:5173
```
