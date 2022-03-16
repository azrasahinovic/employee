export interface User {
    id?: number;
    name?: string;
    email?: string;
    username: string;
    password: string;
    role: string,
    token?: string
}

export enum Role {
    User = 'User',
    Admin = 'Admin'
}