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
// write unit tests for the Order model
describe('Order Model', () => {
    const store = new orders_1.OrderStore();
    const productStore = new products_1.ProductStore();
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have an show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });
    describe('Order CRUD Methods', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield store.create({
                user_id: 1,
                status: true,
                products: [
                    {
                        product_id: 1,
                        quantity: 2,
                    },
                ],
            });
        }));
    });
});
