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
const orders_1 = require("../models/orders");
const helpers_1 = require("./helpers");
const orderStore = new orders_1.OrderStore();
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderStore.index();
        res.json(orders);
    }
    catch (error) {
        res.status(400).send(`Could not get orders. Error: ${error}`);
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            return res.status(400).send('Order ID is required');
        const order = yield orderStore.show(id);
        res.json(order);
    }
    catch (error) {
        res.status(400).send(`Could not get order by id ${id}. Error: ${error}`);
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status,
            products: req.body.products
        };
        if (!order.user_id || !order.status || !order.products) {
            return res.status(400).send('Missing required fields for order');
        }
        ;
        const newOrder = yield orderStore.create(order);
        res.json(newOrder);
    }
    catch (error) {
        res.status(400).send(`Could not create order. Error: ${error}`);
    }
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            order_id: req.params.id,
            user_id: req.body.user_id,
            status: req.body.status,
            products: req.body.products
        };
        if (!order.order_id || !order.user_id || !order.status || !order.products) {
            return res.status(400).send('Missing required fields for order');
        }
        ;
        const updatedOrder = yield orderStore.update(order);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(400).send(`Could not update order. Error: ${error}`);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).send('Order ID is required');
        const deletedOrder = yield orderStore.delete(id);
        res.json(deletedOrder);
    }
    catch (error) {
        res.status(400).send(`Could not delete order. Error: ${error}`);
    }
});
function orderRoutes(app) {
    app.get('/orders', helpers_1.verifyToken, getAllOrders);
    app.get('/orders/:id', helpers_1.verifyToken, getOrderById);
    app.post('/orders/create', helpers_1.verifyToken, createOrder);
    app.put('/orders/:id', helpers_1.verifyToken, updateOrder);
    app.delete('/orders/:id', helpers_1.verifyToken, deleteOrder);
}
exports.default = orderRoutes;
