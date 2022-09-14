import { ITextLocale } from "./ITextLocale";
import { ISkill } from "./ISkill";

/** model for projects in portfolio */
export interface IProject {
    /** entity id */
    id: string;
    /** name of project */
    name: string;
    /** list of languages */
    languages?: ISkill[];
    /** list of frameworks */
    frameworks?: ISkill[];
    /** content text describing project */
    text: ITextLocale[];
    /** url to website if any */
    linkWebsiteUrl?: string;
    /** link to repo if any */
    linkRepoUrl?: string;
}