import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger.config";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    const { method, originalUrl } = req;
    const statusCode = res.statusCode;
    const rawIp = req.ip || "unknown";
    const clientIp = rawIp.includes("::ffff:") ? rawIp.split("::ffff:")[1] : rawIp;

    const message = `${method} ${originalUrl} ${statusCode}`;

    if (statusCode < 400) logger.info({
      message,
      ip: clientIp
    });
  });
  next();
};

export default requestLogger;