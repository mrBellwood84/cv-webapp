import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployment } from "../../Data/Experience/IEmployment";
import { IExperience } from "../../Data/Experience/IExperience";


interface IEmploymentStore {
    employments: IEmployment[];
    selectedEmployment?: IEmployment,
    otherExp: IExperience[],
    selectedOtherExp?: IExperience,
}

const initialState: IEmploymentStore = {
    employments: [],
    otherExp: [],
}

export const employmentStore = createSlice({
    name: "employment",
    initialState,
    reducers: {
        setEmployments: (state, action: PayloadAction<IEmployment[]>) => {
            state.employments = action.payload;
        },
        addEmployment: (state, action: PayloadAction<IEmployment>) => {
            let copy = [...state.employments];
            const employment = action.payload
            copy.push(employment);
            state.employments = copy;
        },
        updateEmployment: (state, action: PayloadAction<IEmployment>) => {
            let copy = [...state.employments].map(x => {
                if (x.id === action.payload.id) return action.payload;
                return x
            })
            state.employments = copy
        },
        removeEmployment: (state, action: PayloadAction<string>) => {
            const filtered = [...state.employments].filter(x => x.id !== action.payload)
            state.employments = filtered
        },
        setSelectedEmployment: (state, action: PayloadAction<IEmployment>) => {
            state.selectedEmployment = action.payload;
        },

        setOtherExperience: (state, action: PayloadAction<IExperience[]>) => {
            state.otherExp = action.payload;
        },
        addOtherExperience: (state, action: PayloadAction<IExperience>) => {
            let copy = [...state.otherExp];
            const exp = action.payload;
            copy.push(exp);
            state.otherExp = copy;
        },
        updateOtherExperience: (state, action: PayloadAction<IExperience>) => {
            let copy = [...state.otherExp].map(x => {
                if (x.id === action.payload.id) return action.payload;
                return x;
            })
            state.otherExp = copy;
        },
        removeExperience: (state, action: PayloadAction<string>) => {
            let filtered = [...state.otherExp].filter(x => x.id !== action.payload);
            state.otherExp = filtered;
        },
        setSelectedOtherExperience: (state, action: PayloadAction<IExperience>) => {
            state.selectedOtherExp = action.payload;
        },

        clearSelected: (state) => {
            state.selectedEmployment = undefined;
            state.selectedOtherExp = undefined;
        }
    }
})