import { ITextLocale } from "../Shared/ITextLocale";
import { ISkillShort } from "../Skills/ISkillShort";

/** model for projects in portfolio */
export interface IProject {
    /** entity id */
    id: string;
    /** name of project */
    projectName: string;
    /** list of languages */
    languages: ISkillShort[];
    /** list of frameworks */
    frameworks: ISkillShort[];
    /** content text describing project */
    text: ITextLocale[];
    /** url to website if any */
    websiteUrl?: string;
    /** link to repo if any */
    repoUrl?: string;
}