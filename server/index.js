const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send();
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
