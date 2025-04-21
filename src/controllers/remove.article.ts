import { db } from "../config/database.config";
import { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis.client";
export const removeArticle = async ( req: Request, res: Response, next: NextFunction ) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ message: 'Article ID is required' });
    try {
        const isExist = db.prepare('SELECT id FROM blogs WHERE id = ?').get(id);
        if(!isExist) return res.status(404).json({ message: 'Article not found' }); 

        const stmt = db.prepare('DELETE FROM blogs WHERE id = ?');
        stmt.run(id);
        await redis.del('all_articles');
        return res.status(200).json({ message: 'Article removed successfully' });
    } catch (error) {
        next(error)
    }
}