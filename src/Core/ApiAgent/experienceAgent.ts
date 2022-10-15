import { IExperience } from "../Data/Experience/IExperience";
import { IRequestById } from "../Data/Others/IRequestById";
import { _rootAgent } from "./_rootAgent";

export const experienceAgent = {

    getEducationExperience: async (): Promise<IExperience[] | number> => {
        try {
            let respose = await _rootAgent.get("experience?type=education")
            if (!respose.ok) return respose.status
            return await respose.json()
        } catch {
            return 500;
        }
    },
    getOtherExperience: async (): Promise<IExperience[] | number> => {
        try {
            let response = await _rootAgent.get("experience?type=other")
            if (!response.ok) return response.status;
            return await response.json();
        } catch {
            return 500;
        }
    },
    postExperience: async (data: IExperience): Promise<IExperience | number> => {
        try {
            let response = await _rootAgent.post("experience", data)
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500;
        }
    },
    updateExperience: async (data: IExperience): Promise<IExperience | number> => {
        try {
            let response = await _rootAgent.put("experience", data);
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500
        }
    },
    deleteExperience: async (id: string): Promise<number> => {
        try {
            const request: IRequestById = { id };
            const response = await _rootAgent.delete("experience", request)
            return response.status;
        } catch {
            return 500;
        }
    }
}