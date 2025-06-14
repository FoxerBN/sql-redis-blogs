import { rateLimit } from "express-rate-limit";

export const getLimiter = rateLimit({
    windowMs:  15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: false,
})