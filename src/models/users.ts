// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';

export interface UpdatedUser {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
}
export interface AuthenUser {
    username: string;
    password: string;
}
export interface BaseUser extends AuthenUser {
    firstname: string;
    lastname: string;
}
export interface User extends BaseUser {
    id: number;
}

export class UsersStore {
    async create(u: BaseUser): Promise<User> {
        try {
            
            const sql_insertUser = 'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';

            // @ts-ignore
            const conn = await Client.connect();

            // hasing password
            const hash = bcrypt.hashSync(u.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS as string, 5));

    
            const result = await conn.query(sql_insertUser, [u.firstname, u.lastname, u.username, hash]);
            conn.release();
            
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }

    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async update(u: UpdatedUser): Promise<User> {
        try {
            const sql = 'UPDATE users SET firstname = $1, lastname = $2, username = $3 WHERE id = $4 RETURNING *';

            // @ts-ignore
            const conn = await Client.connect();

            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, u.id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update user ${u.id}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            return true;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }


    async authenticate(u: AuthenUser): Promise<User | null> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT password_digest FROM users WHERE username=($1)';
            const result = await conn.query(sql, [u.username]);
            if (result.rows.length > 0) {
               const user = result.rows[0];
                if (bcrypt.compareSync(u.password + process.env.BCRYPT_PASSWORD, user.password_digest)) {
                     return user;
                }
            }
            conn.release();
            return null;
        } catch (err) {
            throw new Error(`Could not authenticate user ${u.username}. Error: ${err}`);
        }
    }
}