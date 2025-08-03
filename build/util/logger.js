"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logsDir = 'logs';
const logFileForamt = winston_1.default.format.combine(winston_1.default.format.timestamp(), // Adds a timestamp to the log
winston_1.default.format.json(), // Formats the log as JSON
winston_1.default.format.errors({ stack: true }), // Captures stack traces for errors
winston_1.default.format.splat() // Allows for string interpolation
);
const consoleFormat = winston_1.default.format.combine(winston_1.default.format.colorize(), // Adds color to the console output
winston_1.default.format.simple(), // Formats the log as a simple string
winston_1.default.format.timestamp({ format: "-DD HH:mm:ss" }), // Adds a timestamp to the log
winston_1.default.format.errors({ stack: true }), // Captures stack traces for errors
winston_1.default.format.splat(), // Allows for string interpolation
winston_1.default.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${message} ${stack || ''}`;
}));
const logger = winston_1.default.createLogger(// Configures the logger and here he enters the transports
{
    transports: [
        new winston_1.default.transports.Console({ format: consoleFormat, level: 'info' }), // Console transport for info level logs we set console first bcz we need error and info and warn
        new winston_1.default.transports.File({
            filename: 'error.log', level: 'error', format: logFileForamt, dirname: logsDir
        }), // hey copilot answer me if i set the info level befor error he will save also errors in same file combine? //yes or no ? // then i need always set the error level before info //yes
        new winston_1.default.transports.File({
            filename: 'combined.log', level: 'info', format: logFileForamt, dirname: logsDir
        }) // he set info and warn in same level bcz  info i lower than warn
    ],
    exceptionHandlers: [
        new winston_1.default.transports.File({ filename: 'logs/exceptions.log', format: logFileForamt })
    ]
});
exports.default = logger; // Exports the logger instance for use in other modules
//# sourceMappingURL=logger.js.map