import { ITextLocale } from "../ITextLocale";

/** model for school / education */
export interface ISchool {
    /** entity id */
    id: string;
    /** name of school or institution */
    schoolName: ITextLocale[];
    /** course name */
    course: ITextLocale[];
    /** start date of education */
    startDate: string;
    /** end date of education if any */
    endDate: string;
    /** supplement text if any */
    text: ITextLocale[];
}