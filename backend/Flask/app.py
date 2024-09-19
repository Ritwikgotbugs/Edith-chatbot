from flask import Flask, jsonify, request, session
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import google.generativeai as genai
import tempfile
import PyPDF2
from dotenv import load_dotenv



api_key = "AIzaSyD7zakq__erEUjr641l0XESPPAOx1WMmCg"
genai.configure(api_key=api_key)

app = Flask(__name__)
CORS(app)

def get_conversation_context():
    return session.get('conversation', [])

def update_conversation_context(prompt, response):
    conversation = session.get('conversation', [])
    conversation.append({'prompt': prompt, 'response': response})
    session['conversation'] = conversation

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
    return text

def talk_to_text(prompt, text=None):
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    conversation = get_conversation_context()
    
    if conversation:
        context = "\n".join([f"User: {c['prompt']}\nAI: {c['response']}" for c in conversation])
        prompt_with_context = f"{context}\nUser: {prompt}\nAI:"
    else:
        prompt_with_context = prompt

    if text:
        response = model.generate_content([prompt_with_context, text])
        result = response.candidates[0].content.parts[0].text
    else:
        response = model.generate_content(prompt_with_context)
        result = response.text

    update_conversation_context(prompt, result)

    return result

@app.route('/process', methods=['POST'])
def process():
    prompt = request.form.get('prompt', None)

    if not prompt:
        return jsonify({'message': 'No prompt provided'}), 400

    if 'file' in request.files:
        file = request.files['file']

        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        filename = secure_filename(file.filename)
        temp_dir = tempfile.mkdtemp()
        file_path = os.path.join(temp_dir, filename)
        file.save(file_path)

        try:
            extracted_text = extract_text_from_pdf(file_path)

            if extracted_text.strip() == '':
                return jsonify({'message': 'No text could be extracted from the PDF'}), 400

            result = talk_to_text(prompt, extracted_text)
            return jsonify({"message": "Processing successful", "result": result})
        except Exception as e:
            return jsonify({'message': 'Processing failed', 'error': str(e)}), 500
        finally:
            os.remove(file_path)
    else:
        try:
            result = talk_to_text(prompt)
            return jsonify({"message": "Processing successful", "result": result})
        except Exception as e:
            return jsonify({'message': 'Processing failed', 'error': str(e)}), 500

@app.route('/summarize', methods=['GET'])
def summarize():
    pdf_path = 'Hr-policy.pdf'

    if not os.path.exists(pdf_path):
        return jsonify({'message': 'File not found'}), 404

    try:
        extracted_text = extract_text_from_pdf(pdf_path)

        if extracted_text.strip() == '':
            return jsonify({'message': 'No text could be extracted from the PDF'}), 400

        summary_prompt = "Summarize the following text:"
        
        conversation = get_conversation_context()
        if conversation:
            context = "\n".join([f"User: {c['prompt']}\nAI: {c['response']}" for c in conversation])
            summary_prompt_with_context = f"{context}\nUser: {summary_prompt}\nAI:"
        else:
            summary_prompt_with_context = summary_prompt

        summary = talk_to_text(summary_prompt_with_context, extracted_text)
        return jsonify({"message": "Summarization successful", "result": summary})
    except Exception as e:
        return jsonify({'message': 'Summarization failed', 'error': str(e)}), 500

@app.route('/clear_context', methods=['POST'])
def clear_context():
    session.pop('conversation', None)
    return jsonify({'message': 'Conversation context cleared'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)