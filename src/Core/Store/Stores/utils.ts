import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface INavigationState {
    activeView: string,
    showLanguageDialog: boolean;
}

const initialState: INavigationState = {
    activeView: "",
    showLanguageDialog: false,
}

export const utilStore = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setActiveView: (state, action: PayloadAction<string>) => {
            state.activeView = action.payload
        },
        setShowLanguageDialog: (state, action: PayloadAction<boolean>) => {
            state.showLanguageDialog = action.payload
        }
    }
})