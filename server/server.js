const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();
app.use(express.json());
app.use(cors());

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

app.post('/api/query', (req, res) => {
  const prompt = req.body.prompt || '';
  const py = spawn('python3', ['rag.py', prompt]);
  let data = '';
  py.stdout.on('data', chunk => data += chunk);
  py.stderr.on('data', chunk => console.error(chunk.toString()));
  py.on('close', () => {
    try {
      const result = JSON.parse(data);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: 'Failed to parse response' });
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
