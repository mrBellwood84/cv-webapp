import { IAccountManaged } from "../Data/Account/IAccountManaged";
import { ISignInDto } from "../Data/Account/ISignInDto";
import { ISignInResponse } from "../Data/Account/ISignInResponse";
import { IRequestById } from "../Data/IRequestById";
import { _rootAgent } from "./_rootAgent";

export const accountAgent = {
    signIn: async (signInDto: ISignInDto): Promise<number | ISignInResponse> => {
        try {
            let response = await _rootAgent.post("account/signin", signInDto)
            if (!response.ok) return response.status
            return await response.json();
        } catch {
            return 500
        }
    },

    getCurrent: async (): Promise<number | ISignInResponse> => {
        try {
            let response = await _rootAgent.get("account/current");
            if (!response.ok) return response.status;
            return await response.json()
        } catch {
            return 500
        }
    },

    getAllUsers: async (): Promise<number | IAccountManaged[]> => {
        try {
            let response = await _rootAgent.get("account");
            if (!response.ok) return response.status;
            return await response.json();
        } catch {
            return 500
        }
    },

    createUser: async (account: IAccountManaged) :Promise<number | IAccountManaged> => {
        try {
            let response = await _rootAgent.post("account/edit", account)
            if (!response.ok) return response.status
            return await response.json();
        } catch {
            return 500
        }
    },

    updateUser: async (account: IAccountManaged) : Promise<number | IAccountManaged> => {
        try {
            let response = await _rootAgent.put("account/edit", account);
            if (!response.ok) return response.status;
            return await response.json()
        } catch {
            return 500
        }
    },

    deleteUser: async (id: string) : Promise<number> => {
        try {
            let request: IRequestById = { id }
            let response = await _rootAgent.delete("account/edit", request);
            return response.status;
        } catch {
            return 500;
        }
    }
}