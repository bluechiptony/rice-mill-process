import { format, transports, Logform } from 'winston';
import { WinstonModule, utilities } from 'nest-winston';

export default class LoggerFactory {
  static consoleFormat: Logform.Format;
  static DEBUG = process.env.DEBUG;
  static USE_JSON_LOGGER = process.env.USE_JSON_LOGGER;
  static APP_NAME = 'NANOSCALE BASE API';

  static createLogger() {
    if (this.USE_JSON_LOGGER) {
      this.consoleFormat = format.combine(
        format.ms(),
        format.timestamp(),
        format.json(),
      );
    } else {
      this.consoleFormat = format.combine(
        format.ms(),
        format.timestamp(),
        utilities.format.nestLike(this.APP_NAME, {
          colors: true,
          prettyPrint: true,
        }),
      );
    }

    return WinstonModule.createLogger({
      level: this.DEBUG ? 'debug' : 'info',
      transports: [new transports.Console({ format: this.consoleFormat })],
    });
  }
}
