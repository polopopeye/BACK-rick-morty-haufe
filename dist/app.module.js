"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appModule = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app_controller_1 = __importDefault(require("./app.controller"));
const favourite_module_1 = require("./favourites/favourite.module");
const character_module_1 = require("./rickAndMorty/character.module");
const users_module_1 = require("./users/users.module");
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rick And Morty Backend API',
            version: '1.0.0',
        },
    },
    apis: ['**/*.ts'],
};
const appModule = (app) => {
    // Swagger Docs
    const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, { explorer: true }));
    // Swagger Docs
    // modules
    (0, users_module_1.userModule)(app);
    (0, favourite_module_1.favouriteModule)(app);
    (0, character_module_1.characterModule)(app);
    app.use('/', app_controller_1.default);
};
exports.appModule = appModule;
//# sourceMappingURL=app.module.js.map