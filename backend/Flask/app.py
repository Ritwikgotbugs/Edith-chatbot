from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/data', methods=['GET'])
def data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/send', methods=['POST'])
def send():
    data = request.get_json()
    text = data.get('text')

    if isinstance(text, str):
        return jsonify({'message': 'This is a string'})
    else:
        return jsonify({'message': 'This is not a string'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
