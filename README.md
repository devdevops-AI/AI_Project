# AI_Project

This repository contains a minimal skeleton for an Ansible Automation UI using the MERN stack with a placeholder for RAG and a local LLM.

## Structure

- `server/` – Express.js backend with sample routes.
- `client/` – React frontend skeleton.
- `kb/playbooks/` – Sample knowledge base files for RAG.
- `scripts/` – Utility scripts for system configuration.

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
3. **Run the frontend** (placeholder):
   ```bash
   npm start
   ```

This is a minimal setup intended as a starting point for further development.

## RHEL 8 Benchmark Remediation

The `scripts/` directory contains `fix_rhel8_benchmarks.sh`, a helper for
applying the OpenSCAP STIG profile on RHEL&nbsp;8 systems. Run it with root
privileges:

```bash
sudo ./scripts/fix_rhel8_benchmarks.sh
```
