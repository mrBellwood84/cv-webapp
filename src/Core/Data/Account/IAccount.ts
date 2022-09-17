/** model for account data */
export interface IAccount {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    company?: string;
    role: string;
    email: string;
    accountExpire: Date;
}