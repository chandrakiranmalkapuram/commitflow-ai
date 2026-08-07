"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueService = exports.QueueService = exports.redisConnection = exports.QUEUE_NAME = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
exports.QUEUE_NAME = 'commitflow-queue';
exports.redisConnection = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
});
class QueueService {
    queue;
    constructor() {
        this.queue = new bullmq_1.Queue(exports.QUEUE_NAME, {
            connection: exports.redisConnection,
            defaultJobOptions: {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 1000,
                },
                removeOnComplete: true,
                removeOnFail: false,
            },
        });
    }
    async enqueueGithubPush(jobData) {
        return this.queue.add('process-github-push', jobData);
    }
    async close() {
        await this.queue.close();
    }
}
exports.QueueService = QueueService;
exports.queueService = new QueueService();
