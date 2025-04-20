import { db } from "../config/database.config";
import { Request, Response } from "express";

export const getArticlesByPage = async (req: Request, res: Response) => {
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
    console.error("❌ Error fetching paginated articles:", error);
    return res.status(500).json({ message: "Error fetching articles" });
  }
};
