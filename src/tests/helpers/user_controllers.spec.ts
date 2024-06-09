import jwt, {Secret} from 'jsonwebtoken';
import supertest  from 'supertest';
import app from '../../server';
import { BaseUser } from '../../models/users';

const request = supertest(app);
const SECRET = process.env.TOKEN_KEY as Secret;

describe('User controllers', () => {
    let token: string;
    let user_id = 3;
    const newUser: BaseUser = {
        firstname: 'test',
        lastname: 'test',
        username: 'test',
        password: 'test'
    };

    it('create user', async() => {
        const response = await request.post('/users/create').send(newUser);
        token = response.body;

        expect(response.status).toBe(200);
    });


    it('get all users', async() => {
        const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('get user by id', async() => {
        const response = await request.get(`/users/${user_id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('update user', async() => {
        const response = await request.put(`/users/${user_id}`).send({firstname: 'test1', lastname: 'test1', username: 'test1'}).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('delete user', async() => {
        const response = await request.delete(`/users/${user_id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('login', async() => {
        const response = await request.post('/users/authenticate').send({username: 'test', password: 'test'});
        expect(response.status).toBe(200);
    });
});