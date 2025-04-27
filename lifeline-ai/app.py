from flask import Flask, request, jsonify
from emotion import predict_moods  # <-- import from emotion.py
from collections import Counter
from firebase_config import db  # <-- import Firestore client
from firebase_config import sign_in_with_email_and_password
from firebase_admin import auth as firebase_auth
from functools import wraps

# Initialize Flask app
app = Flask(__name__)

# In-memory history list
history = []

def firebase_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                id_token = auth_header.split(' ')[1]

        if not id_token:
            return jsonify({"error": "Missing or invalid Authorization header"}), 401

        try:
            decoded_token = firebase_auth.verify_id_token(id_token)
            request.user = decoded_token  # Save user info into request object
        except Exception as e:
            print("Token verification failed:", e)
            return jsonify({"error": "Invalid or expired token"}), 401

        return f(*args, **kwargs)
    return decorated_function

@app.route("/")
def home():
    return "LifeLine AI Backend Running!"

@app.route("/analyze", methods=["POST"])
  # <-- Protect this route with Firebase authentication
def analyze():
    data = request.get_json()
    text = data.get("text", "")
    
    labels, tips = predict_moods(text)

    user_id = request.user['uid']  # Firebase UID

    # Save the analysis to Firestore under user's collection
    db.collection('users').document(user_id).collection('mood_history').add({
        'text': text,
        'labels': labels
    })

    return jsonify({
        "labels": labels,
        "tips": tips
    })

@app.route("/history", methods=["GET"])
@firebase_required  # <-- Protect this route with Firebase authentication
def get_history():
    user_id = request.user['uid']

    mood_history_ref = db.collection('users').document(user_id).collection('mood_history')
    docs = mood_history_ref.stream()

    history = []
    for doc in docs:
        history.append(doc.to_dict())

    return jsonify(history)



@app.route("/stats", methods=["GET"])
@firebase_required
def get_stats():
    user_id = request.user['uid']

    mood_history_ref = db.collection('users').document(user_id).collection('mood_history')
    docs = mood_history_ref.stream()

    all_moods = []
    total_requests = 0

    for doc in docs:
        doc_data = doc.to_dict()
        all_moods.extend(doc_data['labels'])
        total_requests += 1

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

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        # Create user in Firebase Authentication
        user = firebase_auth.create_user(
            email=email,
            password=password
        )
        return jsonify({"message": "Signup successful", "uid": user.uid}), 201
    except Exception as e:
        print("Signup error:", e)
        return jsonify({"error": str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        result = sign_in_with_email_and_password(email, password)
        if 'idToken' in result:
            return jsonify({
                "message": "Login successful",
                "idToken": result['idToken'],
                "refreshToken": result['refreshToken'],
                "expiresIn": result['expiresIn']
            }), 200
        else:
            return jsonify({"error": result.get('error', 'Unknown error')}), 400
    except Exception as e:
        print("Login error:", e)
        return jsonify({"error": str(e)}), 400
    


if __name__ == "__main__":
    app.run(debug=True)