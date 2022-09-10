import { ILanguage } from "./ILanguage";
import { ISkill } from "./ISkill";

export interface IProject {
    name: string;
    language: ISkill;
    framework: ISkill[];
    comment: ILanguage;
    linkWebsite?: string;
    linkRepo?: string;
}