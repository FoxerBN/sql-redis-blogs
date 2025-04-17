import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();

import { validateBody } from './middlewares/global/validateBody';
import { notFound } from './middlewares/global/notFound';
import { errorHandler } from './middlewares/global/errorHandler';
import { MessageResponse } from './interfaces/MessageResponse';

// ROUTES


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(cookieParser()); 
// Custom body validation middleware
app.use(express.json(), validateBody);

// Basic route
app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Hi there!',
  });
});


// Global Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;