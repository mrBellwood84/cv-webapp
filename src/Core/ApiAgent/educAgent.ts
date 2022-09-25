import { IRequestById } from "../Data/IRequestById"
import { ISchool } from "../Data/School/ISchool"
import { _rootAgent } from "./_rootAgent"

export const educAgent = {

    getAllSchool: async (): Promise<ISchool[] | number> => {
        try {
            let response = await _rootAgent.get("education/school")
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500;
        }
    },
    postSchool: async (data: ISchool): Promise<ISchool | number> => {
        try {
            let response = await _rootAgent.post("education/school", data)
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500
        }
    },
    updateSchool: async (data: ISchool): Promise<ISchool | number> => {
        try {
            let response = await _rootAgent.put("education/school", data)
            if (!response.ok) return response.status
            return await response.json()
        } catch {
            return 500
        }
    },
    deleteSchool: async (id: string) => {
        try {
            let request: IRequestById = { id }
            let response = await _rootAgent.delete("education/school", request)
            return response.status
        } catch {
            return 500
        }
    },

    getAllOthers:   async () => null,
    postOther:      async () => null,
    updateOther:    async () => null,
    deleteOther:    async () => null
}