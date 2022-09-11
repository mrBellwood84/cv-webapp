import { IExperience } from "./IExperience";
import { IReference } from "./IReference";

export interface IEmployment {
    id: string;
    employer: string;
    startDate: Date;
    endDate?: Date;
    positions: IExperience[];
    reference: IReference[];
}