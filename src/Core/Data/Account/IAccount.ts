/** model for account data */
export interface IAccount {
    firstName: string;
    lastName: string;
    username: string;
    company?: string;
    role: string;
    email: string;
    accountExpire: Date;
}