# AI_Project

This repository contains a minimal skeleton for an Ansible Automation UI using the MERN stack with a placeholder for RAG and a local LLM.

## Structure

- `server/` – Express.js backend with sample routes.
- `client/` – React frontend skeleton.
- `kb/playbooks/` – Sample knowledge base files for RAG and example Ansible playbooks.

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

The Ansible playbooks themselves do not require Node.js. Running `ansible-playbook
kb/playbooks/cis_compliance.yml` will generate `compliance_report.html`
without the UI components.

## Example Playbook

The `kb/playbooks/cis_compliance.yml` playbook demonstrates how to collect
CIS benchmark results for RHEL 8, ESXi 8 and Windows Server 2019 and generate a
simple HTML compliance report. Non-compliant results are highlighted in red in
the report.
