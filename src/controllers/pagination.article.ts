import { db } from "../config/database.config";
import { Request, Response, NextFunction } from "express";

export const getArticlesByPage = async (req: Request, res: Response,next: NextFunction) => {
  const limit = 5;
  const sort = req.query.sort === "asc" ? "ASC" : "DESC";
  const page = parseInt(req.query.page as string) || 1;
  const offset = (page - 1) * limit;
  try {
    const stmt = db.prepare(
      "SELECT * FROM blogs ORDER BY created_at " + sort + " LIMIT ? OFFSET ?"
    );
    const result = stmt.all(limit, offset);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
