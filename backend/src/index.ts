import express from 'express';

const app = express();
const port = 7000;

app.get('/:productId', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/:productName', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.post('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.put('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.delete('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
