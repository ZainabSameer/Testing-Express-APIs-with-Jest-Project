import express from 'express';
import productsRouter from './routes/productsRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', productsRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


