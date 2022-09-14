import { ITextLocale } from "./ITextLocale";

/** model for school / education */
export interface ISchool {
    /** entity id */
    id: string;
    /** name of school or institution */
    schoolName: ITextLocale[];
    /** course name */
    courseName: ITextLocale[];
    /** start date of education */
    startDate: Date;
    /** end date of education if any */
    endDate?: Date;
    /** supplement text if any */
    text: ITextLocale[];
}