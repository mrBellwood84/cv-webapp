import { ILanguage } from "./ILanguage";

export interface ISkill {
    type: string;
    name: ILanguage;
    svgUrl?: string;
    rating: number;
    text: ILanguage;
}