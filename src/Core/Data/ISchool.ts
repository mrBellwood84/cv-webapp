import { ILanguage } from "./ILanguage";

export interface ISchool {
    schoolName: ILanguage;
    courseName: ILanguage;
    start: Date;
    endDate: Date;
    text?: ILanguage;
    comment?: ILanguage;
}