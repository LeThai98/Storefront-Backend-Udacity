// @ts-ignore
import Client from '../database';

export interface BaseUser {
    firstname: string;
    lastname: string;
    password: string;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
}
