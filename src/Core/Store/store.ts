import { configureStore } from "@reduxjs/toolkit";
import { accountStore } from "./Stores/accountStore";
import { adminStore } from "./Stores/adminStore";
import { educationStore } from "./Stores/educationStore";
import { employmentStore } from "./Stores/employmentStore";
import { portfolioStore } from "./Stores/portfolioStore";
import { skillStore } from "./Stores/skillsStore";
import { utilStore } from "./Stores/utilsStore";

const store = configureStore({
    reducer: {
        account: accountStore.reducer,
        admin: adminStore.reducer,
        education: educationStore.reducer,
        employment: employmentStore.reducer,
        skills: skillStore.reducer,
        portfolio: portfolioStore.reducer,
        utils: utilStore.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;