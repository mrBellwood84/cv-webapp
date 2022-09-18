import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccountManaged } from "../../Data/Account/IAccountManaged";

interface IAdminState {
    users: IAccountManaged[];
    selectedUser?: IAccountManaged;
}

const initialState: IAdminState = {
    users: [],
}

export const adminStore = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setUsersList: (state, action: PayloadAction<IAccountManaged[]> ) => {
            state.users = action.payload
        },

        addNewUser: (state, action: PayloadAction<IAccountManaged>) => {
            let updated = [...state.users]
            updated.push(action.payload)
            state.users = updated;
        },

        updateUser: (state, action: PayloadAction<IAccountManaged>) => {
            const updated = [...state.users].map(x => {
                if (x.id === action.payload.id) return action.payload
                return x;
            });
            state.users = updated;
        },

        removeUser: (state, action: PayloadAction<string>) => {
            const filtered = [...state.users].filter(x => x.id !== action.payload)
            state.users = filtered;
        },

        setSelectedUser: (state, action: PayloadAction<IAccountManaged | undefined>) => {
            state.selectedUser = action.payload;
        },
    }
})