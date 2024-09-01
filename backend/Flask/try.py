import streamlit as st
import google.generativeai as genai
from google.oauth2 import service_account
import tempfile

# Configure Google API
api_key = "AIzaSyD7zakq__erEUjr641l0XESPPAOx1WMmCg"
genai.configure(api_key=api_key)

def talk_to_pdf(prompt, uploaded_file=None):
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    if uploaded_file:
        # Save the uploaded file to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            temp_file.write(uploaded_file.read())
            temp_file_path = temp_file.name
        uploaded_file_path = genai.upload_file(path=temp_file_path)
        response = model.generate_content([prompt, uploaded_file_path])
        result = response.candidates[0].content.parts[0].text
    else:
        # Handle case where no file is uploaded
        response = model.generate_content(prompt)
        result = response.text
    
    return result

# Initialize Streamlit app
st.set_page_config(page_title="PDF Text Summarizer")

st.header("PDF Text Summarizer Application")

# Initialize session state for message history if it does not exist
if 'history' not in st.session_state:
    st.session_state.history = []

# Define the message container
messages = st.container(height=675)   

with st.sidebar:
    uploaded_file = st.file_uploader("Upload a PDF file", type="pdf")

prompt = st.chat_input("Say something")

if uploaded_file is not None:
    if prompt:
        st.session_state.history.append({"role": "user", "text": prompt})
        result = talk_to_pdf(prompt, uploaded_file)
        st.session_state.history.append({"role": "assistant", "text": result})

else:
    if prompt:
        st.session_state.history.append({"role": "user", "text": prompt})
        result = talk_to_pdf(prompt)
        st.session_state.history.append({"role": "assistant", "text": result})

# Display message history
with messages:
    for message in st.session_state.history:
        if message['role'] == 'user':
            st.chat_message("user").write(message['text'])
        elif message['role'] == 'assistant':
            st.chat_message("assistant").write(message['text'])
