from flask import Flask, request, send_file
import os
from rembg import remove
from PIL import Image

app = Flask(__name__)

# Define a route to handle file uploads
@app.route('/remove_bg', methods=['POST'])
def remove_background():
    if 'file' not in request.files:
        return "No file part"
    
    file = request.files['file']

    if file.filename == '':
        return "No selected file"
    
    if file:
        # Save the uploaded file
        filename = os.path.join('uploads', file.filename)
        file.save(filename)
        input = Image.open(filename)
        # Process the image to remove background
        output = remove(input)
        output_filename = os.path.join('output', f"processed_{file.filename}")
        output.save(output_filename)


        # Return the processed image as a response
        return send_file(output_filename, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

    https://rembg-three.vercel.app/
idk123.pythonanywhere.com.
