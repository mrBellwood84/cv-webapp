import { IReference } from "../Shared/IReference";
import { IExperience } from "./IExperience";

/** model for employment data */
export interface IEmployment {
    /** entity id */
    id: string;
    /** name of employer / company */
    employer: string;
    /** start date of employment */
    startDate: Date;
    /** end date of employment */
    endDate?: Date;
    /** positions in company listed as IExperience data objects */
    positions: IExperience[];
    /** references from job */
    references: IReference[];
}