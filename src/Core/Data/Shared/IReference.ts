import { ITextLocale } from "./ITextLocale";

/** model for work reference */
export interface IReference {
    /** entity id */
    id: string;
    /** name of person as reference */
    name: string;
    /** position of person as reference */
    role: ITextLocale[];
    /** reference phonenumber */
    phonenumber?: string;
    /** reference email */
    email?: string;
}