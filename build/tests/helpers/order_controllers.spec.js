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
const orders_1 = require("../../models/orders");
const request = (0, supertest_1.default)(server_1.default);
describe('Order controllers', () => {
    let token;
    let orderId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            firstname: 'test',
            lastname: 'test',
            username: 'test',
            password: 'test'
        };
        const newProduct = {
            name: 'test',
            price: 1000,
            categoryid: 1
        };
        const response = yield request.post('/users/create').send(newUser);
        token = response.body;
        //await request.post('/products').send(newProduct).set('Authorization', `Bearer ${token}`);
        spyOn(orders_1.OrderStore.prototype, 'create').and.returnValue(Promise.resolve({
            order_id: 1,
            user_id: 1,
            status: true,
            products: [
                {
                    product_id: 1,
                    quantity: 1
                }
            ]
        }));
        spyOn(orders_1.OrderStore.prototype, 'update').and.returnValue(Promise.resolve({
            order_id: 1,
            user_id: 1,
            status: true,
            products: [
                {
                    product_id: 1,
                    quantity: 1
                }
            ]
        }));
    }));
    it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/orders/create').send({
            user_id: 1,
            status: true,
            products: [
                {
                    product_id: 1,
                    quantity: 1
                }
            ]
        }).set('Authorization', `Bearer ${token}`);
        orderId = response.body.order_id;
        expect(response.status).toBe(200);
    }));
    it('should delete an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete(`/orders/${orderId}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('should get all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orders').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('should update an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put(`/orders/${orderId}`).send({
            user_id: 1,
            status: true,
            products: [
                {
                    product_id: 1,
                    quantity: 1
                }
            ]
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('should get an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/orders/13`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
