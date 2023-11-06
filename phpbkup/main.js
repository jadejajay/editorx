// main.js (Main thread)
const imageInput = document.getElementById('imageInput');
const outputImage = document.getElementById('outputImage');
const worker = new Worker('worker.js');

imageInput.addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                
                worker.postMessage(imageData);  // Send image data to the worker

                // Listen for the result from the worker
                worker.onmessage = function(event) {
                    const filteredImageData = event.data;
                    ctx.putImageData(filteredImageData, 0, 0);
                    outputImage.src = canvas.toDataURL();
                };
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
}
