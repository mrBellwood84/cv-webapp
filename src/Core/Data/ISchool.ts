import { ILanguage } from "./ILanguage";

export interface ISchool {
    id: string;
    schoolName: ILanguage[];
    courseName: ILanguage[];
    start: Date;
    end?: Date;
    text?: ILanguage[];
    comment?: ILanguage[];
}