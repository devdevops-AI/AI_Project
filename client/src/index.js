const { useState } = React;

function App() {
  const [files, setFiles] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');

  const upload = async () => {
    for (const file of files) {
      const text = await file.text();
      await fetch('http://localhost:3001/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain', 'X-Filename': file.name },
        body: text
      });
    }
  };

  const ask = async () => {
    const res = await fetch('http://localhost:3001/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    React.createElement('div', null,
      React.createElement('h1', null, 'Local LLM UI'),
      React.createElement('input', { type: 'file', multiple: true, onChange: e => setFiles(e.target.files) }),
      React.createElement('button', { onClick: upload }, 'Upload'),
      React.createElement('div', null,
        React.createElement('textarea', { value: prompt, onChange: e => setPrompt(e.target.value) }),
        React.createElement('button', { onClick: ask }, 'Ask')
      ),
      React.createElement('pre', null, answer)
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
