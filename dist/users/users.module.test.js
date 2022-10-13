"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const users_module_1 = require("./users.module");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, users_module_1.userModule)(app);
describe('int of => /users', () => {
    let userIdCreated = null;
    let emailCreated = null;
    let token = null;
    it('check creation of an user', () => __awaiter(void 0, void 0, void 0, function* () {
        const randomNumber = Math.floor(Math.random() * 1000);
        const newUser = {
            name: 'test' + randomNumber,
            email: randomNumber + '@test.com',
            birthDate: '2022-10-09',
            password: '123',
        };
        const res = yield (0, supertest_1.default)(app).post('/users/').send(newUser);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('_id');
        userIdCreated = res.body.data._id;
        emailCreated = res.body.data.email;
    }));
    it('check the login connection', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginCredentials = {
            email: emailCreated,
            password: '123',
        };
        const res = yield (0, supertest_1.default)(app).post('/login').send(loginCredentials);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    }));
    it('check find all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get('/users')
            .query({ limit: 3, offset: 0 })
            .set('Cookie', `token=${token}`);
        expect(res.statusCode).toBe(200);
    }));
    it('check get info of the created user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .get(`/users/${userIdCreated}`)
            .set('Cookie', `token=${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data).toHaveProperty('name');
        expect(res.body.data).toHaveProperty('email');
        expect(res.body.data).toHaveProperty('password');
        expect(res.body.data).toHaveProperty('birthDate');
        expect(res.body.data).toHaveProperty('createdAt');
        expect(res.body.data).toHaveProperty('updatedAt');
    }));
    it('check update of the created user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            name: 'test modified',
            password: 'test2',
            birthDate: '1990-01-01',
        };
        const res = yield (0, supertest_1.default)(app)
            .put(`/users/${userIdCreated}`)
            .send(newUser)
            .set('Cookie', `token=${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('modifiedCount');
        expect(res.body.data).toHaveProperty('matchedCount');
    }));
    it('check deletion of created user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .delete(`/users/${userIdCreated}`)
            .set('Cookie', `token=${token}`);
        expect(res.statusCode).toBe(200);
    }));
});
//# sourceMappingURL=users.module.test.js.map