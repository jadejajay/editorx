// worker.js (Worker script)
self.onmessage = function(event) {
    const imageData = event.data;
    const filteredData = applyGrayscaleFilter(imageData);
    self.postMessage(filteredData);
};

function applyGrayscaleFilter(imageData) {
    const data = new Uint8ClampedArray(imageData.data);
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const average = (r + g + b) / 3;
        data[i] = data[i + 1] = data[i + 2] = average;
    }
    return new ImageData(data, imageData.width, imageData.height);
}
