export interface ISignInResponse {
    accountExpire: Date;
    company: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    token?: string;
    userName: string;
}