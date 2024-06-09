// @ts-ignore
import Client from '../database';

export interface OrderedProduct {
    product_id: number;
    quantity: number;
}

export interface OrderDetails {
    user_id: number;
    status: boolean;
    products: OrderedProduct[];
}

export interface Order extends OrderDetails {
    order_id: number;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();

            // sql queries
            const sql_Order = 'SELECT * FROM orders';
            const sql_OrderProduct =
                'SELECT * FROM order_products WHERE order_id=($1)';

            const { orders } = await conn.query(sql_Order);

            let result: Order[] = [];
            for (const order of orders) {
                // Destructuring Assignment : extracts the rows property from the result object and renames it to orderProductRows
                // const { rows: orderedProductRows } = await conn.query(sql_OrderProduct, [order.id]);
                // result.push({
                //     ...order,
                //     products: orderedProductRows,
                //     });

                const orderProducts = await conn.query(sql_OrderProduct, [
                    order.id,
                ]);
                const products = orderProducts.rows.map((product: any) => {
                    return {
                        product_id: product.product_id,
                        quantity: product.quantity,
                    };
                });

                result.push({
                    order_id: order.id,
                    user_id: order.user_id,
                    status: order.status,
                    products: products,
                });
            }

            conn.release();
            return result;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const sql_Order = 'SELECT * FROM orders WHERE id=($1)';
            const sql_OrderProduct =
                'SELECT * FROM order_products WHERE order_id=($1)';

            // @ts-ignore
            const conn = await Client.connect();

            // get order
            const result = await conn.query(sql_Order, [id]);
            const order = result.rows[0];

            // get order products
            const orderProducts = await conn.query(sql_OrderProduct, [id]);
            const products = orderProducts.rows.map((product: any) => {
                return {
                    product_id: product.product_id,
                    quantity: product.quantity,
                };
            });

            conn.release();

            return {
                order_id: order.id,
                user_id: order.user_id,
                status: order.status,
                products: products,
            };
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(o: OrderDetails): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const sql_OrderProduct =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
            // @ts-ignore
            const conn = await Client.connect();

            // create order
            const result = await conn.query(sql, [o.user_id, o.status]);
            const order = result.rows[0];

            // create order products
            const order_products = [];
            for (const product of o.products) {
                const order_pro = await conn.query(sql_OrderProduct, [
                    order.id,
                    product.product_id,
                    product.quantity,
                ]);
                order_products.push(order_pro.rows[0]);
            }

            conn.release();

            return {
                order_id: order.id,
                user_id: order.user_id,
                status: order.status,
                products: order_products,
            };
        } catch (err) {
            throw new Error(
                `Could not add new order for users ${o.user_id}. Error: ${err}`
            );
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const sql_OrderProduct =
                'DELETE FROM order_products WHERE order_id=($1)';
            // @ts-ignore
            const conn = await Client.connect();

            // delete order
            const result = await conn.query(
                'SELECT * FROM orders WHERE id=($1)',
                [id]
            );
            const order = result.rows[0];
            await conn.query(sql, [id]);

            // delete order products
            const deleted = await conn.query(sql_OrderProduct, [id]);
            const products = deleted.rows.map((product: any) => {
                return {
                    product_id: product.product_id,
                    quantity: product.quantity,
                };
            });

            conn.release();

            return {
                order_id: order.id,
                user_id: order.user_id,
                status: order.status,
                products: products,
            };
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }

    async update(o: Order): Promise<Order> {
        try {
            const sql =
                'UPDATE orders SET user_id=($1), status=($2) WHERE id=($3) RETURNING *';
            const sql_OrderProduct =
                'UPDATE order_products SET product_id=($1), quantity=($2) WHERE order_id=($3)';

            // @ts-ignore
            const conn = await Client.connect();

            // update order
            const result = await conn.query(sql, [
                o.user_id,
                o.status,
                o.order_id,
            ]);
            const order = result.rows[0];

            // update order products
            const orderProducts = [];
            for (const product of o.products) {
                const { rows } = await conn.query(sql_OrderProduct, [
                    product.product_id,
                    product.quantity,
                    o.order_id,
                ]);
                orderProducts.push(rows[0]);
            }

            conn.release();

            return {
                order_id: order.id,
                user_id: order.user_id,
                status: order.status,
                products: o.products,
            };
        } catch (err) {
            throw new Error(
                `Could not update order ${o.order_id}. Error: ${err}`
            );
        }
    }
}
