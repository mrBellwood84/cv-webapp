import { ILanguage } from "./ILanguage";
import { ISkill } from "./ISkill";

export interface IProject {
    id: string;
    name: string;
    languages?: ISkill[];
    frameworks?: ISkill[];
    text: ILanguage[];
    linkWebsiteUrl?: string;
    linkRepoUrl?: string;
}