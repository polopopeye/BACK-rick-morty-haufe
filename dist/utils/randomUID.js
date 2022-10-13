"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Generate a random objectID string
const randomObjectId = () => {
    return (Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15));
};
exports.default = randomObjectId;
//# sourceMappingURL=randomUID.js.map