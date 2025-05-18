from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def chat():
    use_msg = request.json.get("message", "")
    bot_reply = f"Hehe iu anh"

    save_to_history("user", use_msg)
    save_to_history("bot", bot_reply)

    return jsonify({"reply": bot_reply})


def save_to_history(speaker, msg):
    entry = {
        "sender": speaker,
        "message": msg,
        "time": datetime.now().isoformat(),
    }
    try:
        with open("chat_history.json", "r", encoding="utf-8") as f:
            history = json.load(f)
            data.append(entry)
            f.seek(0)
            json.dump(data, f, indent=2)
    except FileNotFoundError:
        with open("chat_history.json", "w", encoding="utf-8") as f:
            json.dump([entry], f, indent=2)

    if __name__ == '__main__':
        app.run(debug=True)
