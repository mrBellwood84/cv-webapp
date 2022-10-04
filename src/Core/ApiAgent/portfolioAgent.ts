import { IRequestById } from "../Data/Others/IRequestById";
import { IProject } from "../Data/Portfolio/IProject";
import { _rootAgent } from "./_rootAgent";

export const portfolioAgent = {
    getAll: async (): Promise<IProject[] | number> => {
        try {
            let response = await _rootAgent.get("project");
            if (!response.ok) return response.status;
            return await response.json();
        } catch {
            return 500;
        }
    },
    postSingle: async (data: IProject): Promise<IProject | number> => {
        try {
            const response = await _rootAgent.post("project", data);
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500;
        }
    },
    updateSingle: async (data: IProject) => {
        try {
            const response = await _rootAgent.put("project", data);
            if (!response.ok) return response.status;
            return await response.json()
        } catch {
            return 500
        }
    },
    deleteSingle: async (id: string) => {
        try {
            const request: IRequestById = { id };
            const response = await _rootAgent.delete("project", request);
            return response.status;
        } catch {
            return 500;
        }
    }
}