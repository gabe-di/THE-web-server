import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, new user!');
});

app.get('/hello', (req, res) => {
    res.send('We are learning about web servers!');

});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
