import { isString, isBoolean } from 'lodash';
import { format } from 'date-fns';

export default function createLogger(prefix = '', useTime = true) {
  class Logger {
    constructor(pre = '', time = true) {
      this.prefix = isString(pre) ? pre : '';
      this.useTime = isBoolean(time) ? time : true;
    }

    Date = () => format(Date.now(), 'Pp');

    MakePrefix = () => {
      const hasPrefix = prefix !== '';

      return `${useTime ? this.Date() : ''}${hasPrefix && useTime ? '|' : ''}${this.prefix}:`;
    };

    Log(info) {
      console.log(`${this.MakePrefix()}${info}`);
    }

    Info(info) {
      console.info(`${this.MakePrefix()}${info}`);
    }

    Warn(info) {
      console.warn(`${this.MakePrefix()}${info}`);
    }

    Error(info) {
      console.error(`${this.MakePrefix()}${info}`);
    }
  }

  return new Logger(prefix, useTime);
}
