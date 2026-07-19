from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import os
import uuid
import time
from pipeline import run_research_pipeline

app = FastAPI(
    title="ResearchMind API",
    description="Simple flat backend for ResearchMind",
    version="1.0.0"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(__file__), "research_history.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS research_history (
            id TEXT PRIMARY KEY,
            topic TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            report TEXT NOT NULL,
            critic_review TEXT NOT NULL,
            search_results TEXT,
            scraped_content TEXT,
            created_at REAL NOT NULL
        );
    """)
    conn.commit()
    conn.close()

# Initialize DB on startup
@app.on_event("startup")
def startup_event():
    init_db()

class ResearchRequest(BaseModel):
    topic: str

@app.get("/")
def read_root():
    return {"message": "Welcome to ResearchMind API"}

@app.get("/health")
@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "ResearchMind Multi-Agent API",
        "version": "1.0.0"
    }

@app.post("/research")
@app.post("/api/research")
def start_research(payload: ResearchRequest):
    topic = payload.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Topic cannot be empty")
    
    try:
        # Run pipeline
        state = run_research_pipeline(topic)
        
        # Save to DB
        task_id = str(uuid.uuid4())
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        timestamp_str = time.strftime("%Y-%m-%d %H:%M:%S")
        created_at = time.time()
        
        cursor.execute(
            """
            INSERT OR REPLACE INTO research_history 
            (id, topic, timestamp, report, critic_review, search_results, scraped_content, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (task_id, topic, timestamp_str, state["report"], state["feedback"], state["search_results"], state["scraped_content"], created_at)
        )
        conn.commit()
        conn.close()
        
        # Format the response as expected by the frontend
        return {
            "id": task_id,
            "topic": topic,
            "status": "completed",
            "current_step": 4,
            "step_name": "Research Completed",
            "search_results": state["search_results"],
            "scraped_content": state["scraped_content"],
            "report": state["report"],
            "critic_review": state["feedback"],
            "created_at": timestamp_str,
            "timestamp": timestamp_str
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline run failed: {str(e)}")

@app.get("/history")
@app.get("/api/history")
def get_history():
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT id, topic, timestamp, critic_review FROM research_history ORDER BY created_at DESC")
        rows = cursor.fetchall()
        conn.close()
        
        history_list = []
        for row in rows:
            critic_text = row["critic_review"] or ""
            score = "N/A"
            if "Score:" in critic_text:
                try:
                    score = critic_text.split("Score:")[1].split("\n")[0].strip()
                except Exception:
                    score = "N/A"
            
            history_list.append({
                "id": row["id"],
                "topic": row["topic"],
                "timestamp": row["timestamp"],
                "score": score
            })
        return history_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history/{id}")
@app.get("/api/history/{id}")
def get_history_by_id(id: str):
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM research_history WHERE id = ?", (id,))
        row = cursor.fetchone()
        conn.close()
        
        if not row:
            raise HTTPException(status_code=404, detail="Report not found")
        
        return {
            "id": row["id"],
            "topic": row["topic"],
            "timestamp": row["timestamp"],
            "created_at": row["timestamp"],
            "report": row["report"],
            "critic_review": row["critic_review"],
            "search_results": row["search_results"],
            "scraped_content": row["scraped_content"],
            "status": "completed",
            "current_step": 4,
            "step_name": "Research Completed"
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
