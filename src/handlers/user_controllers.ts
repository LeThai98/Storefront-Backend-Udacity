import { Application, Request, Response } from "express";
import { User,BaseUser,UsersStore,AuthenUser,UpdatedUser } from "../models/users";
import {generateTokenByUser, verifyToken, VerifyToken} from "./helpers";

const userStore = new UsersStore();

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userStore.index();
        res.json(users);   
    } catch (error) {
        res.status(400).send(`Could not get users. Error: ${error}`);
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const user: BaseUser = {
            firstname: req.body.firstname as unknown as string,
            lastname: req.body.lastname as unknown as string,
            username: req.body.username as unknown as string,
            password: req.body.password as unknown as string
        }
        const newUser = await userStore.create(user);

        const token = generateTokenByUser({firstname: newUser.firstname, lastname: newUser.lastname} as VerifyToken);
        res.json(token);
    } catch (error) {
        res.status(400).send(`Could not create user. Error: ${error}`);
    }
}  

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number; // parseInt(req.params.id)
    try {
        if(!id) return res.status(400).send('User ID is required');

        const user = await userStore.show(id);
        res.json(user);

    } catch (error) {
        res.status(400).send(`Could not get user by id ${id}. Error: ${error}`);
    }
}  

const updateUser = async (req: Request, res: Response) => { 
    const id = req.params.id as unknown as number;
    try {
        if(!id) return res.status(400).send('User ID is required');
        const user: UpdatedUser = {
            id: id,
            firstname: req.body.firstname as unknown as string,
            lastname: req.body.lastname as unknown as string,
            username: req.body.username as unknown as string
        }
        const updatedUser = await userStore.update(user);
        res.json(updatedUser);
    } catch (error) {
        res.status(400).send(`Could not update user. Error: ${error}`);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    try {
        if(!id) return res.status(400).send('User ID is required');
        const deletedUser = await userStore.delete(id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400).send(`Could not delete user. Error: ${error}`);
    }
}

const authenticateUser = async (req: Request, res: Response) => {   
    try {
        const user: AuthenUser = {
            username: req.body.username as unknown as string,
            password: req.body.password as unknown as string
        }
        if(!user.username || !user.password){
            res.status(400).send('Username and password are required');
        } 

        const authenticatedUser : User | null = await userStore.authenticate(user);
        if(!authenticatedUser){
            return res.status(401).send('Authentication failed');
        }

        const token = generateTokenByUser({firstname: authenticatedUser.firstname, lastname: authenticatedUser.lastname} as VerifyToken);

        res.json(token);
    } catch (error) {
        res.status(400).send(`Could not authenticate user. Error: ${error}`);
    }
}

export default function userRoutes(app: Application) {
    app.get('/users',verifyToken, getAllUsers);
    app.post('/users/create', createUser);
    app.get('/users/:id', verifyToken, getUserById);
    app.put('/users/:id', verifyToken, updateUser);
    app.delete('/users/:id',verifyToken, deleteUser);
    app.post('/users/authenticate', authenticateUser);
};

