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
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const products_1 = require("../../models/products");
const users_1 = require("../../models/users");
const orderStore = new orders_1.OrderStore();
const productStore = new products_1.ProductStore();
const userStore = new users_1.UsersStore();
// write unit tests for the Order model
describe('Order Model', () => {
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
    });
    it('should have an show method', () => {
        expect(orderStore.show).toBeDefined();
    });
    it('should have an create method', () => {
        expect(orderStore.create).toBeDefined();
    });
    it('should have an delete method', () => {
        expect(orderStore.delete).toBeDefined();
    });
    it('should have an update method', () => {
        expect(orderStore.update).toBeDefined();
    });
    describe('Order CRUD Methods', () => {
        let order;
        let user_id;
        let product_id;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newProduct = {
                    name: 'Test Product',
                    price: 100,
                    categoryid: 1
                };
                const product = yield productStore.create(newProduct);
                product_id = product.id;
                const newUser = {
                    firstname: 'Test',
                    lastname: 'User',
                    username: 'testuser',
                    password: 'password'
                };
                const user = yield userStore.create(newUser);
                user_id = user.id;
                order = {
                    user_id: user.id,
                    status: true,
                    products: [{ product_id: product.id, quantity: 7 }],
                };
            }
            catch (error) {
                console.log('Error in beforeAll: ', error);
            }
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield productStore.delete(product_id);
            yield userStore.delete(user_id);
        }));
        it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
            const newOrder = yield orderStore.create(order);
            expect(newOrder).toEqual({
                order_id: newOrder.order_id,
                user_id: order.user_id,
                status: order.status,
                products: order.products,
            });
            yield orderStore.delete(newOrder.order_id);
        }));
        it('should delete an order', () => __awaiter(void 0, void 0, void 0, function* () {
            const newOrder = yield orderStore.create(order);
            const deletedOrder = yield orderStore.delete(newOrder.order_id);
            expect(deletedOrder).toEqual(true);
        }));
        it('should update an order', () => __awaiter(void 0, void 0, void 0, function* () {
            const newOrder = yield orderStore.create(order);
            const updatedOrder = yield orderStore.update({
                order_id: newOrder.order_id,
                user_id: newOrder.user_id,
                status: false,
                products: newOrder.products,
            });
            expect(updatedOrder).toEqual({
                order_id: newOrder.order_id,
                user_id: newOrder.user_id,
                status: false,
                products: newOrder.products,
            });
            yield orderStore.delete(newOrder.order_id);
        }));
        it('should show all orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const newOrder = yield orderStore.create(order);
            const orders = yield orderStore.index();
            expect(orders.length).toBeGreaterThanOrEqual(1);
            yield orderStore.delete(newOrder.order_id);
        }));
        it('should show an order', () => __awaiter(void 0, void 0, void 0, function* () {
            const newOrder = yield orderStore.create(order);
            const foundOrder = yield orderStore.show(newOrder.order_id);
            expect(foundOrder).toEqual({
                order_id: newOrder.order_id,
                user_id: newOrder.user_id,
                status: newOrder.status,
                products: newOrder.products,
            });
            yield orderStore.delete(newOrder.order_id);
        }));
    });
});
