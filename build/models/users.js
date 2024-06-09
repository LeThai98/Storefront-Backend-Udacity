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
exports.UsersStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersStore {
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql_insertUser = 'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                // hasing password
                const hash = bcrypt_1.default.hashSync(u.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS, 5));
                const result = yield conn.query(sql_insertUser, [u.firstname, u.lastname, u.username, hash]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not add new user. Error: ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE users SET firstname = $1, lastname = $2, username = $3 WHERE id = $4 RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [u.firstname, u.lastname, u.username, u.id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not update user ${u.id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return true;
            }
            catch (err) {
                throw new Error(`Could not delete user ${id}. Error: ${err}`);
            }
        });
    }
    authenticate(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT password_digest FROM users WHERE username=($1)';
                const result = yield conn.query(sql, [u.username]);
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(u.password + process.env.BCRYPT_PASSWORD, user.password_digest)) {
                        return user;
                    }
                }
                conn.release();
                return null;
            }
            catch (err) {
                throw new Error(`Could not authenticate user ${u.username}. Error: ${err}`);
            }
        });
    }
}
exports.UsersStore = UsersStore;
