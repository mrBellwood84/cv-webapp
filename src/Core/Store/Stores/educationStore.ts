import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExperience } from "../../Data/Experience/IExperience";
import { ISchool } from "../../Data/School/ISchool";

interface IEducationState {
    schools: ISchool[];
    selectedSchool?: ISchool;
    otherEduc: IExperience[];
    selectedOtherEduc?: IExperience
}

const initialState: IEducationState = {
    schools: [],
    otherEduc: []
}

export const educationStore = createSlice({
    name: "education",
    initialState,
    reducers: {
        setSchoolList: (state, action: PayloadAction<ISchool[]>) => {
            state.schools = action.payload;
        },

        addSchool: (state, action: PayloadAction<ISchool>) => {
            let copy = [...state.schools];
            const school = action.payload;
            copy.push(school)
            state.schools = copy
        },

        updateSchool: (state, action: PayloadAction<ISchool>) => {
            let copy = [...state.schools].map(x => {
                if (x.id === action.payload.id) return action.payload;
                return x;
            });
            state.schools = copy;
        },

        removeSchool: (state, action: PayloadAction<string>) => {
            const filter = [...state.schools].filter(x => x.id !== action.payload)
            state.schools = filter;
        },

        setSelectedSchool: (state, action: PayloadAction<ISchool>) => {
            state.selectedSchool = action.payload;
        },

        setOthersList: (state, action: PayloadAction<IExperience[]>) => {
            state.otherEduc = action.payload;
        },

        addOther: (state, action: PayloadAction<IExperience>) => {
            let copy = [...state.otherEduc];
            copy.push(action.payload);
            state.otherEduc = copy;
        },

        updateOther: (state, action: PayloadAction<IExperience>) => {
            const copy = [...state.otherEduc].map(x => {
                if (x.id === action.payload.id) return action.payload;
                return x
            })
            state.otherEduc = copy;
        },

        removeOther: (state, action: PayloadAction<string>) => {
            const filtered = [...state.otherEduc].filter(x => x.id !== action.payload);
            state.otherEduc = filtered;
        },

        setSelectedOther: (state, action: PayloadAction<IExperience>) => {
            state.selectedOtherEduc = action.payload;
        },

        removeSelected: (state) => {
            state.selectedSchool = undefined;
            state.selectedOtherEduc = undefined;
        }
     }
})