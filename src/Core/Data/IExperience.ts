import { ILanguage } from "./ILanguage";

export interface IExperience {
    type: string;
    startDate?: Date;
    endDate?: Date;
    header: ILanguage[];
    subheader?: ILanguage[];
    text?: ILanguage[];
}