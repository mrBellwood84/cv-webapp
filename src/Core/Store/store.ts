import { configureStore } from "@reduxjs/toolkit";
import { accountStore } from "./Stores/accountStore";
import { adminStore } from "./Stores/adminStore";
import { utilStore } from "./Stores/utils";

const store = configureStore({
    reducer: {
        account: accountStore.reducer,
        admin: adminStore.reducer,
        utils: utilStore.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;