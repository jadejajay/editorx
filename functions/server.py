import io
from flask import Flask, request, jsonify, send_file
from rembg import remove

app = Flask(__name__)

@app.route('/removebg', methods=['POST'])
def remove_background():
    try:
        # Check if an image file was included in the request
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        input_image = request.files['image'].read()

        # Remove the background
        output_image = remove(input_image)

        # Send the resulting image as a response
        return send_file(
            io.BytesIO(output_image),
            mimetype='image/png'
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
