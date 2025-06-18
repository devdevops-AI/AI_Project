const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.post('/generate-playbook', (req, res) => {
  const playbook = {
    title: 'Linux Patching',
    yaml: `- hosts: all\n  tasks:\n    - name: Example task\n      debug: msg="patching"`
  };
  res.json(playbook);
});

app.post('/run-playbook', (req, res) => {
  res.json({ message: 'Playbook executed' });
});

app.post('/check-connectivity', (req, res) => {
  res.json({ status: 'Connectivity OK' });
});

app.post('/upload', express.text({ limit: '10mb' }), (req, res) => {
  const name = req.headers['x-filename'] || `file_${Date.now()}.txt`;
  const filePath = path.join(uploadDir, path.basename(name));
  fs.writeFileSync(filePath, req.body);
  res.json({ status: 'uploaded' });
});

app.post('/ask', (req, res) => {
  const prompt = req.body.prompt || '';
  const result = spawnSync('python3', [path.join(__dirname, 'llm.py'), prompt], {
    encoding: 'utf8'
  });
  if (result.error) {
    return res.status(500).json({ error: result.error.message });
  }
  res.json({ answer: result.stdout.trim() });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
