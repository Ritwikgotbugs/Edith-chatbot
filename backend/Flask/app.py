from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import google.generativeai as genai
import tempfile
import PyPDF2

# Configure Google API
api_key = "AIzaSyD7zakq__erEUjr641l0XESPPAOx1WMmCg"
genai.configure(api_key=api_key)

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": ""}})


def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
    return text


def talk_to_text(prompt, text=None):
    model = genai.GenerativeModel("gemini-1.5-flash")
    if text:
        response = model.generate_content([prompt, text])
        result = response.candidates[0].content.parts[0].text
    else:
        response = model.generate_content(prompt)
        result = response.text
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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
