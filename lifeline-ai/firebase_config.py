import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

# Load environment variables from .env file
load_dotenv()

# Get the path to the Firebase key from the .env file
firebase_key_path = os.getenv("FIREBASE_KEY_PATH")

if not firebase_key_path:
    raise ValueError("FIREBASE_KEY_PATH is not set in the .env file")

# Path to your downloaded JSON key
cred = credentials.Certificate(firebase_key_path)

# Initialize Firebase app
firebase_admin.initialize_app(cred)

# Create Firestore client
db = firestore.client()

import requests

def sign_in_with_email_and_password(email, password):
    api_key = os.getenv("FIREBASE_WEB_API_KEY")  # You need to add this to your .env!
    if not api_key:
        raise ValueError("FIREBASE_WEB_API_KEY is not set in .env")
    
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={api_key}"
    payload = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    response = requests.post(url, json=payload)
    return response.json()