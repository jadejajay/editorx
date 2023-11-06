import spacy

# Load the spaCy language model
nlp = spacy.load("en_core_web_sm")

def is_question(sentence):
    # Process the input sentence using spaCy
    doc = nlp(sentence)

    # Check if the sentence is a question based on the syntactic structure
    for token in doc:
        if token.dep_ == "aux" or token.dep_ == "auxpass":
            return True

    return False

# Test the function
sentences = [
    "What is your name?",
    "How are you doing today?",
    "I like pizza.",
    "Where is the nearest store?",
    "Have you finished your homework",
    "You went to the store."
]

for sentence in sentences:
    if is_question(sentence):
        print(f"'{sentence}' is a question.")
    else:
        print(f"'{sentence}' is not a question.")
