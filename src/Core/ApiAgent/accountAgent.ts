import { IAccount } from "../Data/Account/IAccount";
import { ISignInDto } from "../Data/Account/ISignInDto";
import { ISignInResponse } from "../Data/Account/ISignInResponse";
import { _rootAgent } from "./_rootAgent";

export const accountAgent = {
    signIn: async (signInDto: ISignInDto): Promise<number | ISignInResponse> => {
        let response = await _rootAgent.post("account/signin", signInDto)

        if (!response.ok) return response.status

        return await response.json();
    },

    getCurrent: async (): Promise<number | ISignInResponse> => {
        let response = await _rootAgent.get("account/current");
        if (!response.ok) return response.status;
        return await response.json()

    }
}