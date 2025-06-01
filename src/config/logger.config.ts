import { createLogger, format, transports } from "winston";
import path from "path";
import { levelFilter } from "../utils/winston.levelFilter";

const { combine, timestamp, errors, colorize, printf } = format;

const logFormat = combine(timestamp(), errors({ stack: true }), format.prettyPrint());

const devFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  })
);

const logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join("logs", "combined.log"),
      format: combine(levelFilter(["info"])),
    }),
    new transports.File({
      filename: path.join("logs", "error.log"),
      format: combine(levelFilter(["warn", "error"])),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({ format: devFormat }));
}

export default logger;
