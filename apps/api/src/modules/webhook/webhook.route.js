"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_js_1 = require("./webhook.controller.js");
const router = (0, express_1.Router)();
router.post('/github', webhook_controller_js_1.receiveGithubWebhook);
exports.default = router;
