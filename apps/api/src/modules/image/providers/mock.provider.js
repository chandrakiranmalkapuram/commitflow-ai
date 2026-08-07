"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockImageProvider = void 0;
class MockImageProvider {
    async generateImage(prompt) {
        console.log('[MockImageProvider] Simulating image generation delay...');
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Format text for placehold.co
        const encodedTheme = encodeURIComponent(prompt.theme).replace(/%20/g, '+');
        const imageUrl = `https://placehold.co/1024x1024/000000/FFFFFF/png?text=${encodedTheme}`;
        console.log('[MockImageProvider] Generated mock image:', imageUrl);
        return {
            provider: 'Mock',
            model: 'Mock-V1',
            imageUrl,
            status: 'SUCCESS',
        };
    }
}
exports.MockImageProvider = MockImageProvider;
