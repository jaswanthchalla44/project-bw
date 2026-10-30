const path = require('path');
const express = require('express');

const app = express();
const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000;

let visits = 0;

// index: false so GET / falls through to the counter handler below
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

app.get('/', (req, res) => {
  visits += 1;
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/status', (req, res) => {
  res.json({ time: new Date().toISOString(), visits });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, HOST, () => {
  console.log(`Deploy Test App listening on http://${HOST}:${PORT}`);
});
