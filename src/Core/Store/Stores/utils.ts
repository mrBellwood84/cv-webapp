import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface INavigationState {
    activeView: string,
    language: string;
    contentButtonDrawerOpen: boolean;
    showLanguageDialog: boolean;
}

const initialState: INavigationState = {
    activeView: "",
    language: "",
    contentButtonDrawerOpen: false,
    showLanguageDialog: false,
}

export const utilStore = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setActiveView: (state, action: PayloadAction<string>) => {
            state.activeView = action.payload
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setShowLanguageDialog: (state, action: PayloadAction<boolean>) => {
            state.showLanguageDialog = action.payload
        },
        toggleContentButtonDrawer: (state, action: PayloadAction<boolean | undefined>) => {
            state.contentButtonDrawerOpen = action.payload ? action.payload : !state.contentButtonDrawerOpen;
        }
    }
})