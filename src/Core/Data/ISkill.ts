import { ILanguage } from "./ILanguage";

export interface ISkill {
    id: string;
    type: string;
    name: string;
    svgUrl?: string;
    rating: number;
    text: ILanguage[];
}