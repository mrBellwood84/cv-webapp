
/** model for account data */
export interface IAccount {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    company?: string;
    email: string;
    role: string;
}