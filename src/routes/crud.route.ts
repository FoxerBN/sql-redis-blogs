import express from 'express';
import { addArticle } from '../controllers/add.article';
import { addLimiter } from '../limiters/add.limiter';
const articleRouter = express.Router();

articleRouter.post('/add', addLimiter, addArticle);

export default articleRouter;