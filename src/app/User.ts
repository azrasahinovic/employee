export interface User {
    id?: number;
    username: string;
    password: string;
    role: string,
    token?: string
}

export enum Role {
    User = 'User',
    Admin = 'Admin'
}