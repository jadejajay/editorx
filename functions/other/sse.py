from flask import Flask, Response
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def event_stream():
    count = 0
    while True:
        time.sleep(1)  # Simulate some work
        count += 1
        yield f"data: {count}\n\n"


@app.route("/sse")
def sse():
    return Response(event_stream(), content_type="text/event-stream")


if __name__ == "__main__":
    app.run(debug=True, port=28000)
