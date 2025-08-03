import winston from "winston";
const logsDir = 'logs';

const logFileForamt = winston.format.combine(
    winston.format.timestamp(),// Adds a timestamp to the log
    winston.format.json(),// Formats the log as JSON
    winston.format.errors({ stack: true }),// Captures stack traces for errors
    winston.format.splat()// Allows for string interpolation
);
const consoleFormat = winston.format.combine(
    winston.format.colorize(),// Adds color to the console output
    winston.format.simple(),// Formats the log as a simple string
    winston.format.timestamp({format : "-DD HH:mm:ss"}),// Adds a timestamp to the log
    winston.format.errors({ stack: true }),// Captures stack traces for errors
    winston.format.splat(),// Allows for string interpolation
    winston.format.printf( ({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level}]: ${message} ${stack || ''}`;
    })
);


const logger = winston.createLogger(// Configures the logger and here he enters the transports
    {
    transports: [
        new winston.transports.Console({ format: consoleFormat ,level : 'info' }),// Console transport for info level logs we set console first bcz we need error and info and warn
        new winston.transports.File({
            filename: 'error.log', level: 'error', format: logFileForamt , dirname: logsDir}),// hey copilot answer me if i set the info level befor error he will save also errors in same file combine? //yes or no ? // then i need always set the error level before info //yes
        new winston.transports.File({
            filename: 'combined.log', level: 'info', format: logFileForamt , dirname: logsDir})// he set info and warn in same level bcz  info i lower than warn
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log', format: logFileForamt })
    ]
});

export default logger; // Exports the logger instance for use in other modules