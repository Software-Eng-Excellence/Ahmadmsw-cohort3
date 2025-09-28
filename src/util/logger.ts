import winston from "winston";

const logsDir = "logs";

// File format
const logFileForamt = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
  winston.format.errors({ stack: true }),
  winston.format.splat()
);

// Console format
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${message} ${stack || ""}`;
  })
);

// Create the logger
const logger = winston.createLogger({
  transports: [
    // Console transports
    new winston.transports.Console({ format: consoleFormat, level: "info" }), // logs info+warn+error
    new winston.transports.Console({ format: consoleFormat, level: "warn" }), // logs warn+error specifically

    // File transports
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: logFileForamt,
      dirname: logsDir,
    }),
    new winston.transports.File({
      filename: "combined.log",
      level: "warn",
      format: logFileForamt,
      dirname: logsDir,
    }),
    new winston.transports.File({
      filename: "combined.log",
      level: "info",
      format: logFileForamt,
      dirname: logsDir,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "exceptions.log",
      format: logFileForamt,
      dirname: logsDir,
    }),
  ],
});

export default logger;
