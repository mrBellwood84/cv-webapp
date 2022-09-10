import { ILanguage } from "./ILanguage";

export interface ISkill {
    type: string;
    name: ILanguage;
    svgString?: string;
    rating: number;
    comments: ILanguage;
}