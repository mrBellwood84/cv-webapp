import { ITextLocale } from "./ITextLocale";

/** model for applicant data */
export interface IApplicant {
    /** entity id */
    id: string;
    /** name of applicant */
    name: string;
    /** title of applicant */
    title: ITextLocale[],
    /** email for applicant */
    email: string,
}