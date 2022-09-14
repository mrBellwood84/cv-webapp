import { ITextLocale } from "./ITextLocale";

/** Model for experience. Shared by several entities.*/
export interface IExperience {
    /** entity id */
    id: string;
    /** experience type: education | position | employment   */
    type: string;
    /** start date of experience if any */
    startDate?: Date;
    /** end date of experience if any */
    endDate?: Date;
    /** header or title */
    header: ITextLocale[];
    /** subheader or subtitle */
    subheader?: ITextLocale[];
    /** content text  */
    text?: ITextLocale[];
}