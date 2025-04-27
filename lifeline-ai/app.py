from flask import Flask, request, jsonify
from emotion import predict_moods  # <-- import from emotion.py
from collections import Counter

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

@app.route("/stats", methods=["GET"])
def get_stats():
    all_moods = []
    
    for entry in history:
        all_moods.extend(entry['labels'])  # Collect all detected labels

    total_requests = len(history)
    mood_counter = Counter(all_moods)

    if mood_counter:
        most_common_mood = mood_counter.most_common(1)[0][0]
    else:
        most_common_mood = None

    return jsonify({
        "total_requests": total_requests,
        "mood_counts": dict(mood_counter),
        "most_common_mood": most_common_mood
    })


if __name__ == "__main__":
    app.run(debug=True)