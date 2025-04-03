import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import sequelize from '~/utils/database';
import logger from '~/utils/logger';
import { Server } from 'http';
import { PORT } from '~/constants/variables';
import routes from '~/routes/index'
import globalErrorMiddleware from '~/middlewares/error.middleware';

const app = new Koa();
app.use(globalErrorMiddleware)
app.use(cors());
app.use(bodyParser());
app.use(routes.routes());
app.use(routes.allowedMethods());

let server: Server;

(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully.');

    server = app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Error connecting to the database:', error);
    process.exit(1);
  }
})();

const shutdown = async () => {
  logger.info('Received shutdown signal. Cleaning up...');
  try {
    if (server) {
      server.close(() => {
        logger.info('HTTP server closed.');
      });
    }
    await sequelize.close();
    logger.info('Database connection closed.');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
