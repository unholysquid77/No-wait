🤖 No-Wait: AI Customer Support for Local Shops

Built for Code Turf 2026 @ Manipal University Jaipur 

💡 The Problem
Small businesses like cafes and barbershops are bogged down by repetitive inquiries regarding hours, pricing, and parking. "No-Wait" provides an instant, RAG-lite (Retrieval-Augmented Generation) solution that allows shop owners to turn their FAQ text into a custom, grounded AI assistant in seconds.

🛠 Tech Stack

Language: Python (Chosen for its robust ecosystem in AI/LLM orchestration and vector search).

Frontend: Next.js + Tailwind CSS + TypeScript (For a production-grade, responsive dashboard).

AI Orchestration: LangChain.

Vector Database: FAISS (Local high-speed context retrieval).

LLM: OpenAI GPT-3.5-Turbo.

📁 Project Structure
/app: Next.js frontend application logic.


CodeTurfPS1.py: The core Python backend handling RAG orchestration, FAISS indexing, and LLM querying.

tailwind.config.js: Custom UI styling for the shop owner dashboard and customer chat interface.

## 🚀 How to Run
1. **Clone the repo:**
  ```bash
# Install Python dependencies
pip install -r requirements.txt

# Set your API Key
export OPENAI_API_KEY='your-api-key-here'

# Run the core logic
python CodeTurfPS1.py

# Install JS dependencies
npm install

# Run the development server
npm run dev
```

Future Scope
WhatsApp Integration: Deploy the bot directly to business WhatsApp accounts.

Voice Support: Use Whisper and TTS for phone-based AI support.

Analytics: A dashboard to track frequent customer queries for business insights.
