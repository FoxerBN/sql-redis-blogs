import express from 'express';
import { addArticle } from '../controllers/add.article';
import { getAllArticles } from '../controllers/get.all.articles';
import { addLimiter } from '../limiters/add.limiter';
import { getLimiter } from '../limiters/get.limiter';
const articleRouter = express.Router();

articleRouter.post('/add', addLimiter, addArticle);
articleRouter.get('/all', getLimiter, getAllArticles);

export default articleRouter;