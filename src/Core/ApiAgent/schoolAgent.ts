import { IRequestById } from "../Data/IRequestById"
import { ISchool } from "../Data/School/ISchool"
import { _rootAgent } from "./_rootAgent"

export const schoolAgent = {

    getAllSchool: async (): Promise<ISchool[] | number> => {
        try {
            let response = await _rootAgent.get("school")
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500;
        }
    },
    postSchool: async (data: ISchool): Promise<ISchool | number> => {
        try {
            let response = await _rootAgent.post("school", data)
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500
        }
    },
    updateSchool: async (data: ISchool): Promise<ISchool | number> => {
        try {
            let response = await _rootAgent.put("school", data)
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500
        }
    },
    deleteSchool: async (id: string) => {
        try {
            let request: IRequestById = { id }
            let response = await _rootAgent.delete("school", request)
            return response.status
        } catch {
            return 500
        }
    },
}