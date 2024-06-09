import { Order, OrderStore, OrderDetails, OrderedProduct } from "../models/orders";
import { Application, Request, Response } from "express";
import {verifyToken} from "./helpers";

const orderStore = new OrderStore();    

const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await orderStore.index();
        res.json(orders);
    } catch (error) {
        res.status(400).send(`Could not get orders. Error: ${error}`);
    }
}

const getOrderById = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    try {
        if (!id) return res.status(400).send('Order ID is required');

        const order = await orderStore.show(id);
        res.json(order);

    } catch (error) {
        res.status(400).send(`Could not get order by id ${id}. Error: ${error}`);
    }
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const order: OrderDetails = {
            user_id: req.body.user_id as unknown as number,
            status: req.body.status as unknown as boolean,
            products: req.body.products as unknown as OrderedProduct[]
        };

        if(!order.user_id || !order.status || !order.products) {
            return res.status(400).send('Missing required fields for order');
        };

        const newOrder = await orderStore.create(order);
        res.json(newOrder);
    } catch (error) {
        res.status(400).send(`Could not create order. Error: ${error}`);
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            order_id: req.params.id as unknown as number,
            user_id: req.body.user_id as unknown as number,
            status: req.body.status as unknown as boolean,
            products: req.body.products as unknown as OrderedProduct[]
        };

        if(!order.order_id || !order.user_id || !order.status || !order.products) {
            return res.status(400).send('Missing required fields for order');
        };

        const updatedOrder = await orderStore.update(order);
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).send(`Could not update order. Error: ${error}`);
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number;
        if (!id) return res.status(400).send('Order ID is required');

        const deletedOrder = await orderStore.delete(id);
        res.json(deletedOrder);
    } catch (error) {
        res.status(400).send(`Could not delete order. Error: ${error}`);
    }
}

export default function orderRoutes(app: Application){
    app.get('/orders',verifyToken, getAllOrders);
    app.get('/orders/:id',verifyToken, getOrderById);
    app.post('/orders/create',verifyToken, createOrder);
    app.put('/orders/:id', verifyToken, updateOrder);
    app.delete('/orders/:id',verifyToken, deleteOrder);
}

