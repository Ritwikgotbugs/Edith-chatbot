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
CORS(app, resources={r"/*": {"origins": "*"}})


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

    # Check if a prompt is provided
    if not prompt:
        return jsonify({'message': 'No prompt provided'}), 400

    # Check if the 'file' is part of the request
    if 'file' in request.files:
        file = request.files['file']

        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        # Securely save the uploaded file to a temporary directory
        filename = secure_filename(file.filename)
        temp_dir = tempfile.mkdtemp()
        file_path = os.path.join(temp_dir, filename)
        file.save(file_path)

        try:
            # Extract text from the PDF
            extracted_text = extract_text_from_pdf(file_path)

            if extracted_text.strip() == '':
                return jsonify({'message': 'No text could be extracted from the PDF'}), 400

            # Process the extracted text with the Gemini API using the prompt
            result = talk_to_text(prompt, extracted_text)
            return jsonify({"message": "Processing successful", "result": result})
        except Exception as e:
            return jsonify({'message': 'Processing failed', 'error': str(e)}), 500
        finally:
            # Clean up the temporary file
            os.remove(file_path)
    else:
        # If no file is provided, process just the prompt
        try:
            result = talk_to_text(prompt)
            return jsonify({"message": "Processing successful", "result": result})
        except Exception as e:
            return jsonify({'message': 'Processing failed', 'error': str(e)}), 500

    return jsonify({'message': 'Request failed'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
