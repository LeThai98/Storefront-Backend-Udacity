import jwt, { Secret } from 'jsonwebtoken';
import dotevn from 'dotenv';
import {NextFunction, Request, Response} from 'express';

dotevn.config();
const SECRET = process.env.TOKEN_KEY as Secret;

export interface VerifyToken {
    firstname: string;
    lastname: string;
}

export const generateTokenByUser = (data: VerifyToken): string => {
  return jwt.sign(data, process.env.TOKEN_KEY as Secret, { expiresIn: '2h' });
};

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        return res.status(401).json('Access denied, invalid token');
    }
    
};