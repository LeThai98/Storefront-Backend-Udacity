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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const SECRET = process.env.TOKEN_KEY;
describe('Product controllers', () => {
    let token;
    let user_id = 1;
    const product = {
        name: 'test',
        price: 100,
        categoryid: 1
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            firstname: 'test',
            lastname: 'test',
            username: 'test',
            password: 'test'
        };
        const response = yield request.post('/users/create').send(newUser);
        token = response.body;
        // @ts-ignore
        const { user } = jsonwebtoken_1.default.verify(token, SECRET);
        //user_id = user.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete(`/users/${user_id}`).set('Authorization', `Bearer ${token}`);
    }));
    it('create product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/products/create').send(product).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('get all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('get product by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('update product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/products/1').send({ name: 'test1', price: 20, categoryid: 1 }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('delete product', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/products/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
