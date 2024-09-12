import { startService } from './service/startService';
import { logger } from './utils';

startService().catch(err => {
  logger.error(err);
  process.exit(1);
});