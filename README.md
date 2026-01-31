# 🤖 No-Wait: AI Customer Support for Local Shops

**Built for Code Turf 2026 @ Manipal University Jaipur**

## 💡 The Problem
Small businesses like cafes and barbershops are bogged down by repetitive inquiries (hours, parking, prices). "No-Wait" provides an instant, RAG-lite (Retrieval-Augmented Generation) solution that allows shop owners to turn their FAQ into a custom AI assistant in seconds.

## 🛠 Tech Stack
- [cite_start]**Language:** Python (Chosen for its robust ecosystem in AI/LLM orchestration)[cite: 94].
- **Framework:** Streamlit (Rapid deployment and clean UI).
- **AI Orchestration:** LangChain.
- **Vector Database:** FAISS (Facebook AI Similarity Search) for local, high-speed context retrieval.
- **LLM:** OpenAI GPT-3.5-Turbo.

## 🚀 How to Run
1. **Clone the repo:**
  ```bash
git clone https://github.com/unholysquid77/No-wait
cd no-wait
pip install -r requirements.txt
export OPENAI_API_KEY='your-api-key-here'
streamlit run app.py
```
