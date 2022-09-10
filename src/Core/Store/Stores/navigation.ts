import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface INavigationState {
    activeView: string
}

const initialState: INavigationState = {
    activeView: ""
}

export const navigationStore = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setActiveView: (state, action: PayloadAction<string>) => {
            state.activeView = action.payload
        }
    }
})