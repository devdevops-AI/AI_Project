# AI_Project

This repository contains a minimal Infrastructure Automation Assistant. The frontend is a simple React UI and the backend exposes an API that bridges to a Python Retrieval Augmented Generation (RAG) engine powered by LLaMA3 via Ollama.

## Structure

- `server/` – Express.js backend with an endpoint to query the RAG engine.
- `client/` – React frontend that sends prompts and displays answers with sources.
- `kb/playbooks/` – Sample knowledge base files for RAG.
- `k8s/` – Kubernetes manifests for deploying the stack.

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
3. **Run the frontend**:
   ```bash
   npm start
   ```

This is a minimal setup intended as a starting point for further development.

## Docker & Kubernetes

Build the Docker images:

```bash
docker build -t backend:latest server
docker build -t frontend:latest client
```

Deploy to Kubernetes (ensure `ollama run llama3` is running on the node or deploy the provided manifest):

```bash
kubectl apply -f k8s/chroma-pvc.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ollama-deployment.yaml  # optional
```

Forward the frontend service:

```bash
kubectl port-forward svc/frontend 3000:3000
```

Then open the UI and query:

```
Show me an Ansible playbook to install Docker on Ubuntu
```
