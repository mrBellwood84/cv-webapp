import { ILanguage } from "./ILanguage";

export interface IReference {
    id: string;
    name: string;
    role: ILanguage[];
    phonenumber?: string;
    email?: string;
}