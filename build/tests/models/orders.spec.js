"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const store = new orders_1.OrderStore();
// write unit tests for the Order model
describe("Order Model", () => {
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
});
