import { createLogger, format, transports } from 'winston';
import { NODE_ENV } from '~/constants/variables';

const { combine, timestamp, printf, colorize, errors } = format;

/**
 * Custom log format function to output log messages.
 * Includes timestamp, log level, and the message (or stack trace if it's an error).
 * 
 * @param {Object} param0 - The log message parameters
 * @param {string} param0.level - The log level (e.g., 'info', 'error')
 * @param {string} param0.message - The log message
 * @param {string} param0.timestamp - The log timestamp
 * @param {string} [param0.stack] - The stack trace for error logs (optional)
 * @returns {string} - The formatted log string
 */
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

/**
 * Creates a logger instance using Winston.
 * This logger has a custom format, timestamps, error stack handling, and supports logging to both console and files.
 * 
 * @type {Logger}
 */
const logger = createLogger({
  level: 'info', // Default logging level
  format: combine(
    colorize(), // Adds color to log levels
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adds a timestamp
    errors({ stack: true }), // Captures stack traces for errors
    customFormat // Uses the custom format for log messages
  ),
  transports: [
    new transports.Console({ format: combine(colorize(), customFormat) }), // Log to console with color
    // new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to a file
    // new transports.File({ filename: 'logs/combined.log' }), // Log all levels to a file
  ],
});

// Conditionally log debug messages to the console if not in production
if (NODE_ENV === 'production') {
  logger.add(
    new transports.Console() // Add console transport for production environment
  );
}

export default logger;
