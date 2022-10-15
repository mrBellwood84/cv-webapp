import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ViewKey = 
      "home" | "education" | "experience" | "skills" | "portfolio" 
    | "manageUsers" | "editUser"
    | "addEducation" | "editSchool" | "editEducationExperience"
    | "addExperience" | "editEmployment" | "editOtherExperience"
    | "addEditSkill" | "addEditProject"

interface INavigationState {
    activeView: ViewKey,
    language: string;
    contentButtonDrawerOpen: boolean;
    showLanguageDialog: boolean;
}

const initialState: INavigationState = {
    activeView: "home",
    language: "",
    contentButtonDrawerOpen: false,
    showLanguageDialog: false,
}

export const utilStore = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setActiveView: (state, action: PayloadAction<ViewKey>) => {
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