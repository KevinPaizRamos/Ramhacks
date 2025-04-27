from transformers import pipeline
import torch

# Check if CUDA (GPU) is available
device = 0 if torch.cuda.is_available() else -1

classifier = pipeline(
    "text-classification",
    model="nateraw/bert-base-uncased-emotion",
    device=device  # <-- THIS controls CPU vs GPU
)

suggestions = {
    'joy': "Keep smiling! Maybe share your happiness with a friend.",
    'anger': "Take a few deep breaths. Step away and cool down.",
    'sadness': "It's okay to feel sad. Try talking to someone you trust.",
    'fear': "Ground yourself. Try to focus on your breathing.",
    'love': "Cherish the people and things you love!",
    'surprise': "Embrace the unexpected!"
}

def predict_moods(text, top_k=2):
    # Debugging: Print the raw output of the classifier
    results = classifier(text, top_k=None)
    print("Classifier Output:", results)  # Print the raw output

    # Ensure results is a list of dictionaries
    if not isinstance(results, list):
        raise ValueError("Unexpected classifier output format. Expected a list of dictionaries.")

    # Sort results by score
    sorted_results = sorted(results, key=lambda x: x['score'], reverse=True)

    detected_moods = []
    for result in sorted_results[:top_k]:  # Pick top_k moods (e.g., 2)
        detected_moods.append(result['label'].lower())

    tips = [suggestions.get(mood, "Take care of yourself!") for mood in detected_moods]

    return detected_moods, tips