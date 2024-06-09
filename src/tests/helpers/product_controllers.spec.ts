import jwt, {Secret} from 'jsonwebtoken';
import supertest  from 'supertest';
import app from '../../server';
import { ProductStore,Product, BaseProduct } from '../../models/products';
import { BaseUser } from '../../models/users';

const request = supertest(app);
const SECRET = process.env.TOKEN_KEY as Secret;

describe('Product controllers', () => {
    let token: string;
    let user_id = 1;
    const product: BaseProduct = {
        name: 'test',
        price: 100,
        categoryid: 1
    }

    beforeAll(async() => {
        const newUser: BaseUser = {
            firstname: 'test',
            lastname: 'test',
            username: 'test',
            password: 'test'
        };

        const response = await request.post('/users/create').send(newUser);
        token = response.body;

        // @ts-ignore
        const {user} = jwt.verify(token, SECRET);
        //user_id = user.id;
    });

    afterAll(async() => {
        const response = await request.delete(`/users/${user_id}`).set('Authorization', `Bearer ${token}`);
    });

    it('create product', async() => {
        const response = await request.post('/products/create').send(product).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('get all products', async() => {
        const response = await request.get('/products').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('get product by id', async() => {
        const response = await request.get('/products/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('update product', async() => {
        const response = await request.put('/products/1').send({name: 'test1', price:20, categoryid: 1}).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('delete product', async() => {
        const response = await request.delete('/products/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
