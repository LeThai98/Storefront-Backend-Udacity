import {
    OrderStore,
    OrderedProduct,
    OrderDetails,
    Order,
} from '../../models/orders';
import { ProductStore, Product } from '../../models/products';
import { User } from '../../models/users';

// write unit tests for the Order model
describe('Order Model', () => {
    const store = new OrderStore();
    const productStore = new ProductStore();

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
        beforeAll(async () => {
            await store.create({
                user_id: 1,
                status: true,
                products: [
                    {
                        product_id: 1,
                        quantity: 2,
                    },
                ],
            });
        });
    });
});
