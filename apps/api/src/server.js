"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_js_1 = require("./app.js");
const queue_worker_js_1 = require("./modules/queue/queue.worker.js");
const queue_service_js_1 = require("./modules/queue/queue.service.js");
const PORT = Number(process.env.PORT ?? 4000);
const app = (0, app_js_1.createApp)();
const server = app.listen(PORT, () => {
    console.log(`CommitFlow API running on port ${PORT}`);
});
async function gracefulShutdown() {
    console.log('Shutting down gracefully...');
    await queue_worker_js_1.queueWorker.close();
    await queue_service_js_1.queueService.close();
    server.close(() => {
        process.exit(0);
    });
}
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
