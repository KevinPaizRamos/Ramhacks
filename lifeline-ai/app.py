from flask import Flask, request, jsonify
from emotion import predict_moods  # <-- import from emotion.py

# Initialize Flask app
app = Flask(__name__)

# In-memory history list
history = []

@app.route("/")
def home():
    return "LifeLine AI Backend Running!"

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")
    
    labels, tips = predict_moods(text)

    # Save to history
    history.append({
        "text": text,
        "labels": labels
    })

    return jsonify({
        "labels": labels,
        "tips": tips
    })

@app.route("/history", methods=["GET"])
def get_history():
    return jsonify(history)

if __name__ == "__main__":
    app.run(debug=True)