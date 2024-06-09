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
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const helpers_1 = require("./helpers");
const userStore = new users_1.UsersStore();
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userStore.index();
        res.json(users);
    }
    catch (error) {
        res.status(400).send(`Could not get users. Error: ${error}`);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password
        };
        const newUser = yield userStore.create(user);
        const token = (0, helpers_1.generateTokenByUser)({ firstname: newUser.firstname, lastname: newUser.lastname });
        res.json(token);
    }
    catch (error) {
        res.status(400).send(`Could not create user. Error: ${error}`);
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id; // parseInt(req.params.id)
    try {
        if (!id)
            return res.status(400).send('User ID is required');
        const user = yield userStore.show(id);
        res.json(user);
    }
    catch (error) {
        res.status(400).send(`Could not get user by id ${id}. Error: ${error}`);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            return res.status(400).send('User ID is required');
        const user = {
            id: id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username
        };
        const updatedUser = yield userStore.update(user);
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400).send(`Could not update user. Error: ${error}`);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!id)
            return res.status(400).send('User ID is required');
        const deletedUser = yield userStore.delete(id);
        res.json(deletedUser);
    }
    catch (error) {
        res.status(400).send(`Could not delete user. Error: ${error}`);
    }
});
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password
        };
        if (!user.username || !user.password) {
            res.status(400).send('Username and password are required');
        }
        const authenticatedUser = yield userStore.authenticate(user);
        if (!authenticatedUser) {
            return res.status(401).send('Authentication failed');
        }
        const token = (0, helpers_1.generateTokenByUser)({ firstname: authenticatedUser.firstname, lastname: authenticatedUser.lastname });
        res.json(token);
    }
    catch (error) {
        res.status(400).send(`Could not authenticate user. Error: ${error}`);
    }
});
function userRoutes(app) {
    app.get('/users', helpers_1.verifyToken, getAllUsers);
    app.post('/users/create', helpers_1.verifyToken, createUser);
    app.get('/users/:id', helpers_1.verifyToken, getUserById);
    app.put('/users/:id', helpers_1.verifyToken, updateUser);
    app.delete('/users/:id', helpers_1.verifyToken, deleteUser);
    app.post('/users/authenticate', authenticateUser);
}
exports.default = userRoutes;
;
