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
const products_1 = require("../models/products");
const helpers_1 = require("./helpers");
const productStore = new products_1.ProductStore();
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productStore.index();
        res.json(products);
    }
    catch (error) {
        res.status(400).send(`Could not get products. Error: ${error}`);
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            return res.status(400).send('Product ID is required');
        const product = yield productStore.show(id);
        res.json(product);
    }
    catch (error) {
        res.status(400).send(`Could not get product by id ${id}. Error: ${error}`);
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            categoryid: req.body.categoryid
        };
        const newProduct = yield productStore.create(product);
        res.json(newProduct);
    }
    catch (error) {
        res.status(400).send(`Could not create product. Error: ${error}`);
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            return res.status(400).send('Product ID is required');
        const product = {
            name: req.body.name,
            price: req.body.price,
            categoryid: req.body.categoryid
        };
        const updatedProduct = yield productStore.update(id, product);
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(400).send(`Could not update product. Error: ${error}`);
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            return res.status(400).send('Product ID is required');
        const deletedProduct = yield productStore.delete(id);
        res.json(deletedProduct);
    }
    catch (error) {
        res.status(400).send(`Could not delete product. Error: ${error}`);
    }
});
const productRoutes = (app) => {
    app.get('/products', helpers_1.verifyToken, getAllProducts);
    app.get('/products/:id', helpers_1.verifyToken, getProductById);
    app.post('/products/create', helpers_1.verifyToken, createProduct);
    app.put('/products/:id', helpers_1.verifyToken, updateProduct);
    app.delete('/products/:id', helpers_1.verifyToken, deleteProduct);
};
exports.default = productRoutes;
