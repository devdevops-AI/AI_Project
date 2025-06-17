import os
import sys
import glob

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), 'uploads')


def load_documents():
    texts = []
    for path in glob.glob(os.path.join(UPLOAD_DIR, '*')):
        if os.path.isfile(path):
            try:
                with open(path, 'r', errors='ignore') as f:
                    texts.append(f.read())
            except Exception:
                continue
    return "\n".join(texts)


def simple_search(prompt):
    corpus = load_documents()
    if not corpus:
        return 'No documents found.'
    lines = corpus.splitlines()
    keywords = [w.lower() for w in prompt.split() if len(w) > 2]
    for line in lines:
        lower = line.lower()
        if all(k in lower for k in keywords):
            return line.strip()
    return 'No relevant information found.'


def qa_search(prompt):
    """Use a transformers QA model if available."""
    try:
        from transformers import pipeline
    except Exception:
        return simple_search(prompt)

    model = os.environ.get('QA_MODEL', 'distilbert-base-uncased-distilled-squad')
    try:
        qa = pipeline('question-answering', model=model, device=-1)
        context = load_documents()
        if not context:
            return 'No documents found.'
        result = qa(question=prompt, context=context)
        return result.get('answer', '').strip() or 'No answer found.'
    except Exception:
        return simple_search(prompt)


def search(prompt):
    return qa_search(prompt)

def main():
    prompt = ' '.join(sys.argv[1:])
    print(search(prompt))

if __name__ == '__main__':
    main()
