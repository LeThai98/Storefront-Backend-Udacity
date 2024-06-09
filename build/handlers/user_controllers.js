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
        res.json(newUser);
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
        res.json(authenticatedUser);
    }
    catch (error) {
        res.status(400).send(`Could not authenticate user. Error: ${error}`);
    }
});
function userRoutes(app) {
    app.get('/users', getAllUsers);
    app.post('/users/create', createUser);
    app.get('/users/:id', getUserById);
    app.put('/users/:id', updateUser);
    app.delete('/users/:id', deleteUser);
    app.post('/users/authenticate', authenticateUser);
}
exports.default = userRoutes;
;
