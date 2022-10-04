import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISkill } from "../../Data/Skills/ISkill";

interface ISkillStore {
    skills: ISkill[]
    selectedSkill?: ISkill
}

const initialState: ISkillStore = {
    skills: []
}

export const skillStore = createSlice({
    name: "skill",
    initialState,
    reducers: {
        setSkills: (state, action: PayloadAction<ISkill[]>) => {
            state.skills = action.payload;
        },
        addSkill: (state, action: PayloadAction<ISkill>) => {
            let copy = [...state.skills];
            const skill = action.payload;
            copy.push(skill)
            state.skills = copy;
        },
        updateSkill: (state, action: PayloadAction<ISkill>) => {
            const copy = [...state.skills].map(x => {
                if (x.id === action.payload.id) return action.payload
                return x
            })
            state.skills = copy;
        },
        removeSkills: (state, action: PayloadAction<string>) => {
            const filtered = [...state.skills].filter(x => x.id !== action.payload)
            state.skills = filtered;
        },
        setSelected: (state, action: PayloadAction<ISkill>) => {
            state.selectedSkill = action.payload;
        },
        clearSelected: (state) => {
            state.selectedSkill = undefined;
        }
        
    }
});