// @ts-ignore
import Client from '../database';

export interface BaseProduct {
    name: string;
    price: number;
    categoryid: number;
}
export interface Product extends BaseProduct {
    id: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();

            const sql = 'SELECT * FROM products';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    async create(p: BaseProduct): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, price, categoryid) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await Client.connect();

            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.categoryid,
            ]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }

    async update(id: number, p: BaseProduct): Promise<Product> {
        try {
            const sql =
                'UPDATE products SET name=($1), price=($2), categoryid=($3) WHERE id=($4) RETURNING *';
            // @ts-ignore
            const conn = await Client.connect();

            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.categoryid,
                id,
            ]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update product ${id}. Error: ${err}`);
        }
    }
}
