import { createLogger, format, transports } from 'winston';
import { Format, TransformableInfo } from 'logform';

const localDevelopment = (): Format => {
  const colorizer = format.colorize();

  return format.combine(
    format.timestamp(),
    format.colorize({
      colors: {
        timestamp: 'dim',
        prefix: 'magenta',
        field: 'cyan',
        debug: 'grey',
      },
    }),
    format.printf((info: TransformableInfo) => {
      const { component, level, message, service, timestamp, ...fields } = info;
      const prefix = component || service;
      const timestampColor = colorizer.colorize('timestamp', timestamp);
      const prefixColor = colorizer.colorize('prefix', prefix);

      const extraFields = Object.entries(fields)
        .map(
          ([key, value]) => `${colorizer.colorize('field', `${key}`)}=${value}`
        )
        .join(' ');

      return `${timestampColor} ${prefixColor} ${level} ${typeof message === 'object' ? JSON.stringify(message) : message
        } ${extraFields}`;
    })
  );
};

const logger = createLogger({
  level: 'info',
  format: format.combine(
    localDevelopment()
  ),
  transports: [new transports.Console()],
}).child({ service: 'stock-tracker-backend' });

export { logger };

