const express = require('express');
const app = express();
app.use(express.json());

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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
