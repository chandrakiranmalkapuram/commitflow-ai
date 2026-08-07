"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiUnderstandingService = exports.AiUnderstandingService = void 0;
const ai_factory_js_1 = require("./ai.factory.js");
class AiUnderstandingService {
    MAX_RETRIES = 2;
    async generateUnderstanding(analysis) {
        const provider = ai_factory_js_1.AiFactory.getProvider();
        let attempt = 0;
        while (attempt <= this.MAX_RETRIES) {
            try {
                console.log(`[AI Service] Generating understanding (Attempt ${attempt + 1})`);
                const result = await provider.generateUnderstanding(analysis);
                return result;
            }
            catch (error) {
                attempt++;
                console.warn(`[AI Service] Attempt ${attempt} failed:`, error.message);
                if (attempt > this.MAX_RETRIES) {
                    console.error('[AI Service] Max retries reached. Returning controlled failure.');
                    throw new Error('AI Understanding generation failed after maximum retries');
                }
            }
        }
        throw new Error('Unexpected error in AI Understanding generation');
    }
}
exports.AiUnderstandingService = AiUnderstandingService;
exports.aiUnderstandingService = new AiUnderstandingService();
