import { ILanguage } from "./ILanguage";

export interface IExperience {
    id: string;
    type: string;
    startDate?: Date;
    endDate?: Date;
    header: ILanguage[];
    subheader?: ILanguage[];
    text?: ILanguage[];
}