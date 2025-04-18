import { db } from '../config/database.config';
import { Request, Response } from 'express';

export const getAllArticles = async(req: Request,res: Response) => {
    try {
        const stmt = db.prepare('SELECT * FROM blogs');
        const result = stmt.all();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error getting all articles:", error);
        return res.status(500).json({ message: "Error getting all articles" });
    }
}
