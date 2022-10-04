import { IRequestById } from "../Data/Others/IRequestById";
import { ISkill } from "../Data/Skills/ISkill";
import { _rootAgent } from "./_rootAgent";

export const skillAgent = {
    getAll: async (): Promise<ISkill[] | number> => {
        try {
            let response = await _rootAgent.get("skill");
            if (!response.ok) return response.status;
            return await response.json();
        } catch {
            return 500;
        }
    },
    postSingle: async (data: ISkill): Promise<ISkill | number> => {
        try {
            const response = await _rootAgent.post("skill", data);
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500;
        }
    },
    updateSingle: async (data: ISkill) => {
        try {
            const response = await _rootAgent.put("skill", data);
            if (!response.ok) return response.status;
            return await response.json()
        } catch {
            return 500
        }
    },
    deleteSingle: async (id: string) => {
        try {
            const request: IRequestById = { id };
            const response = await _rootAgent.delete("skill", request);
            return response.status;
        } catch {
            return 500;
        }
    }
}