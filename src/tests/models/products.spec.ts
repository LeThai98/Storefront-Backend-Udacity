import { BaseProduct, ProductStore, Product } from '../../models/products';

const store = new ProductStore();

// write unit tests for the Product model
describe('Product Model', () => {
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
