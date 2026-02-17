import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Backend working'})
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});