import express from 'express';
const app = express();
const port = 3001;

// TODO: change app to main

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
