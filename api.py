from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

app = Flask(__name__)
CORS(app)  # Allows your Next.js app to talk to this Python script

# --- GLOBAL STATE (The Brain) ---
vector_store = None

# Default knowledge base so it works immediately for the demo
DEFAULT_TEXT = """
We are 'The Coffee Nook'.
Hours: Mon-Fri 7am-7pm, Sat-Sun 8am-5pm.
Wifi Password: 'espresso_shots'.
Parking: Free parking in the back lot, spots 12-20.
Refund Policy: No refunds on consumed food. Exchanges only within 10 minutes.
"""

def init_vector_store(text_content):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=500,
        chunk_overlap=50,
        length_function=len
    )
    texts = text_splitter.create_documents([text_content])
    embeddings = OpenAIEmbeddings()
    return FAISS.from_documents(texts, embeddings)

# Initialize with default text on startup
# MAKE SURE YOUR API KEY IS SET IN TERMINAL: export OPENAI_API_KEY=sk-...
if os.environ.get("OPENAI_API_KEY"):
    print("Training AI on default data...")
    vector_store = init_vector_store(DEFAULT_TEXT)
else:
    print("⚠️ WARNING: No API Key found. AI will crash if you try to chat.")

@app.route('/chat', methods=['POST'])
def chat():
    global vector_store
    data = request.json
    query = data.get('query')
    
    if not vector_store:
        return jsonify({"answer": "My brain is offline. (Check API Key)"}), 500

    prompt_template = """You are a helpful customer support assistant.
    Use the following context to answer the question.
    If you don't know, say "I don't have that info."
    
    {context}
    
    Question: {question}
    Answer:"""
    
    PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0),
        chain_type="stuff",
        retriever=vector_store.as_retriever(),
        chain_type_kwargs={"prompt": PROMPT}
    )
    
    try:
        response = qa_chain.run(query)
        return jsonify({"answer": response})
    except Exception as e:
        return jsonify({"answer": f"Error: {str(e)}"}), 500

@app.route('/update_knowledge', methods=['POST'])
def update_knowledge():
    global vector_store
    data = request.json
    new_text = data.get('text')
    vector_store = init_vector_store(new_text)
    return jsonify({"status": "Brain updated!"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
