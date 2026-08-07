"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinProvider = void 0;
class LinkedinProvider {
    providerName = 'LINKEDIN';
    async publish(text, accessToken) {
        try {
            // 1. Fetch user info to get the author URN
            const meResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!meResponse.ok) {
                return { success: false, errorMessage: 'Failed to fetch LinkedIn user info' };
            }
            const meData = await meResponse.json();
            const authorUrn = `urn:li:person:${meData.sub}`;
            // 2. Post the content
            const postResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'X-Restli-Protocol-Version': '2.0.0',
                },
                body: JSON.stringify({
                    author: authorUrn,
                    lifecycleState: 'PUBLISHED',
                    specificContent: {
                        'com.linkedin.ugc.ShareContent': {
                            shareCommentary: {
                                text: text,
                            },
                            shareMediaCategory: 'NONE',
                        },
                    },
                    visibility: {
                        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
                    },
                }),
            });
            if (!postResponse.ok) {
                const errorText = await postResponse.text();
                return { success: false, errorMessage: `LinkedIn API error: ${errorText}` };
            }
            const postData = await postResponse.json();
            return {
                success: true,
                externalPostId: postData.id
            };
        }
        catch (error) {
            return { success: false, errorMessage: error.message };
        }
    }
}
exports.LinkedinProvider = LinkedinProvider;
