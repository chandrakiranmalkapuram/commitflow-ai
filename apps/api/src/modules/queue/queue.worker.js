"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueWorker = exports.QueueWorker = void 0;
const bullmq_1 = require("bullmq");
const queue_service_js_1 = require("./queue.service.js");
const github_service_js_1 = require("../github/github.service.js");
const github_mapper_js_1 = require("../github/github.mapper.js");
const analyzer_service_js_1 = require("../analyzer/analyzer.service.js");
const ai_service_js_1 = require("../ai/ai.service.js");
const content_service_js_1 = require("../content/content.service.js");
const content_types_js_1 = require("../content/content.types.js");
const image_service_js_1 = require("../image/image.service.js");
const generation_repository_js_1 = require("../db/generation.repository.js");
const repository_service_js_1 = require("../repository/repository.service.js");
class QueueWorker {
    worker;
    constructor() {
        this.worker = new bullmq_1.Worker(queue_service_js_1.QUEUE_NAME, async (job) => {
            console.log(`[Worker] Processing job ${job.id} of type ${job.name}`);
            switch (job.name) {
                case 'process-github-push': {
                    await this.handleGithubPush(job.data.payload);
                    break;
                }
                default:
                    console.warn(`[Worker] Unknown job name: ${job.name}`);
            }
        }, {
            connection: queue_service_js_1.redisConnection,
        });
        this.worker.on('completed', (job) => {
            console.log(`[Worker] Job ${job.id} completed successfully`);
        });
        this.worker.on('failed', (job, err) => {
            console.error(`[Worker] Job ${job?.id} failed with error: ${err.message}`);
        });
    }
    async handleGithubPush(payload) {
        const event = (0, github_mapper_js_1.mapGithubPushEvent)(payload);
        const [owner, repo] = event.repository.split('/');
        if (!event.commit) {
            throw new Error('No commit reference found in payload');
        }
        // Map webhook payload directly to registered Repository
        const registeredRepo = await repository_service_js_1.repositoryService.findByOwnerAndName(owner, repo);
        if (!registeredRepo) {
            console.log(`[Worker] Skipped event for ${owner}/${repo} - repository not registered.`);
            return;
        }
        if (!registeredRepo.active) {
            console.log(`[Worker] Skipped event for ${owner}/${repo} - repository registered but inactive.`);
            return;
        }
        // Initialize Generation persistence via Organization ID
        const generation = await generation_repository_js_1.generationRepository.createGeneration(event.commit, owner, repo, registeredRepo.organizationId);
        console.log(`[Worker] Created Generation Record: ${generation.id}`);
        try {
            const commitDiff = await github_service_js_1.githubService.fetchCommitDiff(owner, repo, event.commit);
            // Analyze the diff deterministically
            const analysis = analyzer_service_js_1.analyzerService.analyzeCommitDiff(commitDiff);
            await generation_repository_js_1.generationRepository.saveGitAnalysis(generation.id, analysis);
            console.log('[Worker] Deterministic Analysis Saved');
            // Generate the LLM understanding
            const aiUnderstanding = await ai_service_js_1.aiUnderstandingService.generateUnderstanding(analysis);
            await generation_repository_js_1.generationRepository.saveAiUnderstanding(generation.id, aiUnderstanding);
            console.log('[Worker] AI Understanding Saved');
            // Generate Content for LinkedIn
            const linkedinContent = await content_service_js_1.contentService.generateContent(aiUnderstanding, content_types_js_1.Platform.LinkedIn, content_types_js_1.ToneProfile.Professional);
            await generation_repository_js_1.generationRepository.saveGeneratedContent(generation.id, linkedinContent);
            console.log('[Worker] LinkedIn Content Saved');
            // Generate Image Prompt
            const imagePrompt = await image_service_js_1.imageService.generatePrompt(aiUnderstanding, content_types_js_1.Platform.LinkedIn);
            await generation_repository_js_1.generationRepository.saveImagePrompt(generation.id, imagePrompt);
            console.log('[Worker] Image Prompt Saved');
            // Generate Image
            const generatedImage = await image_service_js_1.imageService.generateImage(imagePrompt);
            await generation_repository_js_1.generationRepository.saveGeneratedImage(generation.id, generatedImage);
            console.log('[Worker] Image Generation Saved');
            // Mark generation as completed
            await generation_repository_js_1.generationRepository.updateGenerationStatus(generation.id, 'COMPLETED');
            console.log(`[Worker] Generation ${generation.id} completed successfully`);
            // TODO: Enqueue Publisher Job here
        }
        catch (error) {
            await generation_repository_js_1.generationRepository.updateGenerationStatus(generation.id, 'FAILED');
            console.error(`[Worker] Generation ${generation.id} failed`, error);
            throw error; // Rethrow so BullMQ marks the job as failed
        }
    }
    async close() {
        await this.worker.close();
    }
}
exports.QueueWorker = QueueWorker;
// Initialize and export the worker singleton
exports.queueWorker = new QueueWorker();
