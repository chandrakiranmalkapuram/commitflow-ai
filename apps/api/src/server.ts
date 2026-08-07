import 'dotenv/config';

import { createApp } from './app.js';
import { queueWorker } from './modules/queue/queue.worker.js';
import { queueService } from './modules/queue/queue.service.js';

const PORT = Number(process.env.PORT ?? 4000);

const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`CommitFlow API running on port ${PORT}`);
});

async function gracefulShutdown() {
  console.log('Shutting down gracefully...');
  await queueWorker.close();
  await queueService.close();
  server.close(() => {
    process.exit(0);
  });
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);