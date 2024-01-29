import { config } from 'dotenv';
import { executeSearch } from './search.js';
import express from 'express';
import cors from 'cors';

config();

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

app.get('/search/:query', async(req, res) => {
  res.json(await executeSearch(req.params.query));
});