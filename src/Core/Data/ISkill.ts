import { ITextLocale } from "./ITextLocale";

/** model for skills in programming languages or frameworks */
export interface ISkill {
    /** entity id */
    id: string;
    /** type of skill: language | framework */
    type: string;
    /** name of language or framework */
    name: string;
    /**
     * url for svg resource to image tag
     * @remarks loaded from https://devicon.dev/
     */
    svgUrl: string;
    /** self proclamed rating of skill in range 1 - 5 */
    rating: number;
    /** supplement text regarding skill */
    text: ITextLocale[];
}