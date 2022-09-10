import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../../Data/IAccount";

interface IAccountState {
    account: IAccount | undefined
}

const initialState: IAccountState = {
    account: undefined
}

export const accountStore = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<IAccount>) => {
            state.account = action.payload
        },
        removeAccount: (state) => {
            state.account = undefined;
        }
    }
})
