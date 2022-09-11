import { ILanguage } from "./ILanguage";

export interface IApplicant {
    id: string;
    name: string;
    title: ILanguage,
    email: string,
}