import { db } from '../config/database.config';
import { Request, Response } from 'express';
import { blogSchema } from '../schemas/blog.schema';
import { redis } from '../config/redis.client';
export const addArticle = async (req: Request, res: Response) => {
    const parse = blogSchema.safeParse(req.body);
    if(!parse.success){
        const errorMessages = parse.error.errors.map(e => e.message);
        return res.status(400).json({ message: errorMessages });
    }

    const { author, title, content, tags} = parse.data;
    try {
        const tagString = tags.map(tag => tag.trim().toLowerCase()).join(',');
        const stmt = db.prepare('INSERT INTO blogs (author, title, content, tags) VALUES (?, ?, ?, ?)');
        stmt.run(author, title, content, tagString);
        await redis.del('all_articles');
        return res.status(201).json({ message: 'Article added successfully' });        
    } catch (error) {
        console.error('Error adding article:', error);
        return res.status(500).json({ message: 'Error adding article' });
    }
}