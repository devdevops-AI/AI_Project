# AI_Project

This repository contains a minimal skeleton for a web UI that can upload text documents and query them using a very small CPU-based search script. It uses Express for the backend and a lightweight React page for the frontend.

## Structure

- `server/` – Express.js backend with sample routes.
- `client/` – React frontend skeleton.
- `kb/playbooks/` – Sample knowledge base files for RAG.

## Getting Started

1. **Install dependencies** (requires Node.js):
   ```bash
   cd server && npm install
   ```
   ```bash
   cd ../client && npm install
   ```
2. **Run the backend**:
   ```bash
   npm start
   ```
3. **Run the frontend** (serves static HTML):
   Open `client/public/index.html` in a browser.

### Local LLM

The helper script in `server/llm.py` will use a Hugging Face
`transformers` question-answering model when available. Install the
library and download a model locally (for example
`distilbert-base-uncased-distilled-squad`) so the application can run
fully offline:

```bash
pip install transformers  # requires manual download in offline setups
```

If no model is available, the script falls back to a simple keyword
search of uploaded documents.

This is a minimal setup intended as a starting point for further development.
