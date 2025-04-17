import { rateLimit } from "express-rate-limit";
import { blogSchema } from "../schemas/blog.schema";

export const addLimiter = rateLimit({
    windowMs: 1 * 24 * 60 * 60 * 1000, // 1 day
    limit: 3,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skip: (req) => {
        const result = blogSchema.safeParse(req.body);
        return !result.success;
      }
})