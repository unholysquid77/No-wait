from openai import OpenAI
import streamlit as st
import tempfile
import json

# -------------------------------
# CONFIG
# -------------------------------


import streamlit as st
import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

MODEL = "gpt-4.1-mini"
client = OpenAI(api_key="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")


# --- CONFIGURATION & SETUP ---
st.set_page_config(page_title="No-Wait Support Bot", layout="wide")

# TIP: Add your OPENAI_API_KEY to a .env file or Streamlit secrets for security
# For the hackathon, you can input it in the sidebar for the judges to test.
with st.sidebar:
    st.header("⚙️ Configuration")
    api_key = st.text_input("OpenAI API Key", type="password")
    if api_key:
        os.environ["OPENAI_API_KEY"] = api_key


# --- RAG LOGIC (The Brains) ---
@st.cache_resource
def create_vector_store(text_content):
    """
    Takes raw text, chunks it, embeds it, and stores it in FAISS.
    """
    if not text_content:
        return None

    # 1. Split Text
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=500,
        chunk_overlap=50,
        length_function=len
    )
    texts = text_splitter.create_documents([text_content])

    # 2. Embed & Store (Using OpenAI for speed/quality, can swap for HuggingFace)
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_documents(texts, embeddings)

    return vectorstore


def get_answer(vectorstore, query):
    """
    Retrieves context and generates a strict answer.
    """
    # Strict System Prompt to ensure it ONLY answers from the text
    prompt_template = """You are a helpful customer support assistant for a local shop.
    Use the following pieces of context to answer the question at the end.

    RULES:
    1. If the answer is not in the context, say "I'm sorry, I don't have that information directly from the shop owner."
    2. Do NOT make up hours, prices, or policies.
    3. Keep answers short and friendly.

    {context}

    Question: {question}
    Answer:"""

    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0),
        chain_type="stuff",
        retriever=vectorstore.as_retriever(),
        chain_type_kwargs={"prompt": PROMPT}
    )

    return qa_chain.run(query)


# --- FRONTEND (The Face) ---
st.title("🤖 'No-Wait' Shop Assistant")
st.markdown("### *The AI that knows your shop better than you do.*")

# Two tabs: One for the Owner (Setup), One for the Customer (Chat)
tab1, tab2 = st.tabs(["Store Owner Setup", "Customer Chat"])

with tab1:
    st.subheader("Step 1: Feed Your Knowledge Base")
    st.info("Paste your FAQ, Menu, Parking info, or Rules here.")

    # Default text for demo purposes
    default_text = """
    We are 'The Coffee Nook'.
    Hours: Mon-Fri 7am-7pm, Sat-Sun 8am-5pm.
    Wifi Password: 'espresso_shots'.
    Parking: Free parking in the back lot, spots 12-20.
    Refund Policy: No refunds on consumed food. Exchanges only within 10 mins.
    """

    knowledge_base = st.text_area("Shop Data Dump", value=default_text, height=200)

    if st.button("Build Bot Brain"):
        if not api_key:
            st.error("Please enter an OpenAI API Key in the sidebar first!")
        else:
            with st.spinner("Indexing data..."):
                # Save to session state to persist across reruns
                st.session_state.vector_store = create_vector_store(knowledge_base)
                st.success("Bot is ready! Switch to the 'Customer Chat' tab.")

with tab2:
    st.subheader("Live Customer Support")

    # Initialize chat history
    if "messages" not in st.session_state:
        st.session_state.messages = []

    # Display chat messages
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    # Chat Input
    if prompt := st.chat_input("Ask about hours, wifi, or parking..."):
        # Display user message
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        # Generate response
        if "vector_store" in st.session_state and st.session_state.vector_store:
            with st.chat_message("assistant"):
                with st.spinner("Thinking..."):
                    response = get_answer(st.session_state.vector_store, prompt)
                    st.markdown(response)
            st.session_state.messages.append({"role": "assistant", "content": response})
        else:
            st.error("⚠️ The bot hasn't been trained yet. Go to the 'Store Owner Setup' tab.")