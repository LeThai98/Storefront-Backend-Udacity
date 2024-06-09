import {
    OrderStore,
    OrderedProduct,
    OrderDetails,
    Order,
} from '../../models/orders';
import { ProductStore, Product , BaseProduct} from '../../models/products';
import { User, UsersStore, BaseUser } from '../../models/users';

    const orderStore = new OrderStore();
    const productStore = new ProductStore();
    const userStore = new UsersStore();

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
        let order: OrderDetails;
        let user_id: number;
        let product_id: number;
        
        beforeAll(async () => {
            try {
                const newProduct: BaseProduct = {
                    name: 'Test Product',
                    price: 100,
                    categoryid: 1
                };
                const product =  await productStore.create(newProduct);
                product_id = product.id;
    
                const newUser: BaseUser = {
                    firstname: 'Test',
                    lastname: 'User',
                    username: 'testuser',
                    password: 'password'
                };
                const user = await userStore.create(newUser);
                user_id = user.id;
    
                order = {
                    user_id: user.id,
                    status: true,
                    products: [{ product_id: product.id, quantity: 7 }],
                };
            } catch (error) {
                console.log('Error in beforeAll: ', error);
            }
            
        });

        afterAll(async () => {
            await productStore.delete(product_id);
            await userStore.delete(user_id);
        });

        it('should create a new order', async () => {
            const newOrder = await orderStore.create(order);
            expect(newOrder).toEqual({
                order_id: newOrder.order_id,
                user_id: order.user_id,
                status: order.status,
                products: order.products,
            });

            await orderStore.delete(newOrder.order_id);
        });

        it('should delete an order', async () => {
            const newOrder = await orderStore.create(order);
            const deletedOrder = await orderStore.delete(newOrder.order_id);
            expect(deletedOrder).toEqual(true);
        });

        it('should update an order', async () => {
            const newOrder = await orderStore.create(order);
            const updatedOrder = await orderStore.update({
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

            await orderStore.delete(newOrder.order_id);
        });

        it('should show all orders', async () => {
            const newOrder = await orderStore.create(order);
            const orders = await orderStore.index();
            expect(orders.length).toBeGreaterThanOrEqual(1);

            await orderStore.delete(newOrder.order_id);
        });

        it('should show an order', async () => {
            const newOrder = await orderStore.create(order);
            const foundOrder = await orderStore.show(newOrder.order_id);
            expect(foundOrder).toEqual({
                order_id: newOrder.order_id,
                user_id: newOrder.user_id,
                status: newOrder.status,
                products: newOrder.products,
            });

            await orderStore.delete(newOrder.order_id);
        });
    });
});
