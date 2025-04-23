import { db } from "../config/database.config";
import { Request, Response, NextFunction } from "express";
import { ArticleQuery } from "../interfaces/ArticleQuery";

export const searchArticle = async (
  req: Request<{}, {}, {}, ArticleQuery>,
  res: Response,
  next: NextFunction
) => {
  const raw = req.query;
  const author = raw.author?.trim();
  const title  = raw.title?.trim();
  const tags   = raw.tags?.split(",").map(t => t.trim()).filter(t => t);

  const filters: string[] = [];
  const params:  any[]    = [];

  if (author) {
    filters.push("author LIKE ?");
      params.push(`%${author}%`);
  }
  if (title) {
    filters.push("title LIKE ?");
    params.push(`%${title}%`);
  }
  if (tags && tags.length) {
    tags.forEach(tag => {
      filters.push("tags LIKE ?");
      params.push(`%${tag}%`);
    });
  }

  try {
    const where = filters.length
      ? "WHERE " + filters.join(" AND ")
      : "";

    const sql = `
      SELECT *
        FROM blogs
      ${where}
      ORDER BY created_at DESC
    `;

    const stmt   = db.prepare(sql);
    const result = stmt.all(...params);

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};
