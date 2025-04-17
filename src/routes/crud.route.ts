import express from 'express';
import { addArticle } from '../controllers/add.article';
const articleRouter = express.Router();

articleRouter.post('/add', addArticle);

export default articleRouter;