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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const SECRET = process.env.TOKEN_KEY;
describe('User controllers', () => {
    let token;
    let user_id = 3;
    const newUser = {
        firstname: 'test',
        lastname: 'test',
        username: 'test',
        password: 'test'
    };
    it('create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/users/create').send(newUser);
        token = response.body;
        expect(response.status).toBe(200);
    }));
    it('get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/users').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('get user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/users/${user_id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('update user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put(`/users/${user_id}`).send({ firstname: 'test1', lastname: 'test1', username: 'test1' }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('delete user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete(`/users/${user_id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/users/authenticate').send({ username: 'test', password: 'test' });
        expect(response.status).toBe(200);
    }));
});
