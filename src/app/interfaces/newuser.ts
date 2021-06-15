export interface NewUser {
    name: string;
    password: string;
    email: string;
    role: string;
    permissions?: string
}