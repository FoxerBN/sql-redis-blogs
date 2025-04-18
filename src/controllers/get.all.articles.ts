import { db } from '../config/database.config';
import { Request, Response } from 'express';
import { redis } from '../config/redis.client';

export const getAllArticles = async(req: Request,res: Response) => {
    const cacheKey = 'all_articles';
    try {

        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            console.log('📦 Using cached data');
            return res.status(200).json(JSON.parse(cachedData));
        }
        const stmt = db.prepare('SELECT * FROM blogs');
        const result = stmt.all();
        await redis.set(cacheKey, JSON.stringify(result), 'EX', 60 * 5);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error getting all articles:", error);
        return res.status(500).json({ message: "Error getting all articles" });
    }
}
