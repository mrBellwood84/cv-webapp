export interface IAccountManaged {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    company?: string;
    role: string;
    email: string;
    accountExpire: string;
    loginCount: number;
    password?: string;
    exportedPdf: boolean;
}