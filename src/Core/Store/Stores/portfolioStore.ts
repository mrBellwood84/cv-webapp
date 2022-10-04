import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../../Data/Portfolio/IProject";

interface IPortfolioStore {
    projects: IProject[]
    selectedProject?: IProject;
}

const initialState: IPortfolioStore = {
    projects: []
}

export const portfolioStore = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload
        },
        addProject: (state, action: PayloadAction<IProject>) => {
            let copy = [...state.projects];
            let proj = action.payload;
            copy.push(proj)
            state.projects = copy
        },
        updateProject: (state, action: PayloadAction<IProject>) => {
            const copy = [...state.projects].map(x => {
                if (x.id === action.payload.id) return action.payload
                return x
            })
            state.projects = copy;
        },
        removeProject: (state, action: PayloadAction<string>) => {
            const filtered = [...state.projects].filter(x => x.id !== action.payload)
            state.projects = filtered;
        },
        setSelected: (state, action: PayloadAction<IProject>) => {
            state.selectedProject = action.payload
        },
        clearSelected: (state) => {
            state.selectedProject = undefined;
        }

    }
})