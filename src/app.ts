import express from 'express';
import cors from 'cors';
import { router } from './infra/routes';
import { swaggerRouter } from './infra/routes/swagger';
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);
app.use(swaggerRouter);

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
