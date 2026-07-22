import express from 'express';
import pagesRouter from './routes/pages.js';
import apiRouter from './routes/api.js';

const app = express();
const PORT = 3000;

app.use('/', pagesRouter);
app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).send('Page not found.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/about', (req, res) => {
  res.send('This is a web programming course.');
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ${userId}, post ${postId}`);
});

app.get('/search', (req, res) => {
  const term = req.query.term || 'nothing';
  const limit = parseInt(req.query.limit) || 5;
  res.send(`Searching for "${term}", showing ${limit} results.`);
});

app.get('/api/user/:id', (req, res) => {
  const user = { id: req.params.id, name: 'Alice', role: 'admin' };
  res.json(user);
});

app.get('/api/user/:id', (req, res) => {
  if (req.params.id !== '1') {
    res.status(404).send('User not found.');
    return;
  }
  res.json({ id: '1', name: 'Alice' });
});



app.use((req, res) => {
  res.status(404).send('Page not found.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});