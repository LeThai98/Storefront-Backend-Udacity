import { ProductStore, Product, BaseProduct } from "../models/products";
import { Request, Response, Application } from "express";
import {verifyToken} from "./helpers";

const productStore = new ProductStore();

const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await productStore.index();
        res.json(products);
    } catch (error) {
        res.status(400).send(`Could not get products. Error: ${error}`);
    }
}

const getProductById = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    try {
        if (!id) return res.status(400).send('Product ID is required');

        const product = await productStore.show(id);
        res.json(product);

    } catch (error) {
        res.status(400).send(`Could not get product by id ${id}. Error: ${error}`);
    }
}

const createProduct = async (req: Request, res: Response) => {
    try {
        const product: BaseProduct = {
            name: req.body.name as unknown as string,
            price: req.body.price as unknown as number,
            categoryid: req.body.categoryid as unknown as number
        }
        const newProduct = await productStore.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400).send(`Could not create product. Error: ${error}`);
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    try {
        if (!id) return res.status(400).send('Product ID is required');
        const product: BaseProduct = {
            name: req.body.name as unknown as string,
            price: req.body.price as unknown as number,
            categoryid: req.body.categoryid as unknown as number
        }
        const updatedProduct = await productStore.update(id, product);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send(`Could not update product. Error: ${error}`);
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    try {
        if (!id) return res.status(400).send('Product ID is required');
        const deletedProduct = await productStore.delete(id);
        res.json(deletedProduct);
    } catch (error) {
        res.status(400).send(`Could not delete product. Error: ${error}`);
    }
}

const productRoutes = (app: Application) => {
    app.get('/products',verifyToken, getAllProducts);
    app.get('/products/:id',verifyToken, getProductById);
    app.post('/products/create',verifyToken, createProduct);
    app.put('/products/:id',verifyToken, updateProduct);
    app.delete('/products/:id',verifyToken, deleteProduct);
}

export default productRoutes;




