import { IEmployment } from "../Data/Experience/IEmployment"
import { IRequestById } from "../Data/Others/IRequestById";
import { _rootAgent } from "./_rootAgent"

export const employmentAgent = {
    getAll: async (): Promise<IEmployment[] | number> => {
        try {
            let response = await _rootAgent.get("employment");
            if (!response.ok) return response.status;
            return await response.json();
        } catch {
            return 500;
        }
    },
    postSingle: async (data: IEmployment): Promise<IEmployment | number> => {
        try {
            const response = await _rootAgent.post("employment", data);
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500;
        }
    },
    updateSingle: async (data: IEmployment) => {
        try {
            const response = await _rootAgent.put("employment", data);
            if (!response.ok) return response.status;
            return await response.json()
        } catch {
            return 500
        }
    },
    deleteSingle: async (id: string) => {
        try {
            const request: IRequestById = { id };
            const response = await _rootAgent.delete("employment", request);
            return response.status;
        } catch {
            return 500;
        }
    }
}