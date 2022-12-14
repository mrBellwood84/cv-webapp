import { ITextLocale } from "../Shared/ITextLocale";

export type ExperienceType = "education" | "employment" | "other"

/** Model for experience. Shared by several entities.*/
export interface IExperience {
    /** entity id */
    id: string;
    /** experience type: education | position | employment   */
    type: ExperienceType;
    /** start date of experience if any */
    startDate?: string;
    /** end date of experience if any */
    endDate?: string;
    /** header or title */
    header: ITextLocale[];
    /** subheader or subtitle */
    subheader: ITextLocale[];
    /** content text  */
    text: ITextLocale[];
}