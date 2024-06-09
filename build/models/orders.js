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
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                // sql queries
                const sql_Order = 'SELECT * FROM orders';
                const sql_OrderProduct = 'SELECT * FROM order_products WHERE order_id=($1)';
                const { orders } = yield conn.query(sql_Order);
                let result = [];
                for (const order of orders) {
                    // Destructuring Assignment : extracts the rows property from the result object and renames it to orderProductRows
                    // const { rows: orderedProductRows } = await conn.query(sql_OrderProduct, [order.id]);
                    // result.push({
                    //     ...order,
                    //     products: orderedProductRows,
                    //     });
                    const orderProducts = yield conn.query(sql_OrderProduct, [
                        order.id,
                    ]);
                    const products = orderProducts.rows.map((product) => {
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
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql_Order = 'SELECT * FROM orders WHERE id=($1)';
                const sql_OrderProduct = 'SELECT * FROM order_products WHERE order_id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                // get order
                const result = yield conn.query(sql_Order, [id]);
                const order = result.rows[0];
                // get order products
                const orderProducts = yield conn.query(sql_OrderProduct, [id]);
                const products = orderProducts.rows.map((product) => {
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
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
                const sql_OrderProduct = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                // create order
                const result = yield conn.query(sql, [o.user_id, o.status]);
                const order = result.rows[0];
                // create order products
                const order_products = [];
                for (const product of o.products) {
                    const order_pro = yield conn.query(sql_OrderProduct, [
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
            }
            catch (err) {
                throw new Error(`Could not add new order for users ${o.user_id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM orders WHERE id=($1)';
                const sql_OrderProduct = 'DELETE FROM order_products WHERE order_id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                // delete order
                const result = yield conn.query('SELECT * FROM orders WHERE id=($1)', [id]);
                const order = result.rows[0];
                yield conn.query(sql, [id]);
                // delete order products
                const deleted = yield conn.query(sql_OrderProduct, [id]);
                const products = deleted.rows.map((product) => {
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
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. Error: ${err}`);
            }
        });
    }
    update(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE orders SET user_id=($1), status=($2) WHERE id=($3) RETURNING *';
                const sql_OrderProduct = 'UPDATE order_products SET product_id=($1), quantity=($2) WHERE order_id=($3)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                // update order
                const result = yield conn.query(sql, [
                    o.user_id,
                    o.status,
                    o.order_id,
                ]);
                const order = result.rows[0];
                // update order products
                const orderProducts = [];
                for (const product of o.products) {
                    const { rows } = yield conn.query(sql_OrderProduct, [
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
            }
            catch (err) {
                throw new Error(`Could not update order ${o.order_id}. Error: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
