import jwt, {Secret} from 'jsonwebtoken';
import supertest  from 'supertest';
import app from '../../server';
import { BaseUser } from '../../models/users';
import { BaseProduct } from '../../models/products';
import { OrderStore } from '../../models/orders';


const request = supertest(app);

describe('Order controllers', () => {
    let token: string;
    let orderId: string;

    beforeAll(async() => {
        const newUser : BaseUser = {
            firstname: 'test',
            lastname: 'test',
            username: 'test',
            password: 'test'
        };

        const newProduct : BaseProduct = {
            name: 'test',
            price: 1000,
            categoryid: 1
        };

        const response = await request.post('/users/create').send(newUser);
        token = response.body;

        //await request.post('/products').send(newProduct).set('Authorization', `Bearer ${token}`);
        
        spyOn(OrderStore.prototype, 'create').and.returnValue(
            Promise.resolve({
                order_id: 1,
                user_id: 1,
                status: true,
                products: [
                    {
                        product_id: 1,
                        quantity: 1
                    }
                ]
                
            })
        );

        spyOn(OrderStore.prototype, 'update').and.returnValue(
            Promise.resolve({
                order_id: 1,
                user_id: 1,
                status: true,
                products: [
                    {
                        product_id: 1,
                        quantity: 1
                    }
                ]
            })
        );
    });

    it('should create a new order', async() => {
        const response = await request.post('/orders/create').send({
            user_id: 1,
            status: true,
            products: [
                {
                    product_id: 1,
                    quantity: 1
                }
            ]
        }).set('Authorization', `Bearer ${token}`);

        orderId = response.body.order_id;
        expect(response.status).toBe(200);
    });

   it('should delete an order', async() => {
        const response = await request.delete(`/orders/${orderId}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should get all orders', async() => {
        const response = await request.get('/orders').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should update an order', async() => {
        const response = await request.put(`/orders/${orderId}`).send({
            user_id: 1,
            status: true,
            products: [
                {
                    product_id: 1,
                    quantity: 1
                }
            ]
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should get an order', async() => {
        const response = await request.get(`/orders/13`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

});