import { DateTime } from 'luxon';

import * as github from './github';

const DateTimeFormat = 'yyyy/MM/dd HH:mm:ss';

// eslint-disable-next-line
export class Logger {
  info(message: unknown): void {
    github.infoLog(message, `INFO [${DateTime.utc().toFormat(DateTimeFormat)}]`);
  }
  error(message: unknown): void {
    github.errorLog(message, `ERROR [${DateTime.utc().toFormat(DateTimeFormat)}]`);
  }
}

export const logger = new Logger();
