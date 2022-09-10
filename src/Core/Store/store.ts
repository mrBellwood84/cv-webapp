import { configureStore } from "@reduxjs/toolkit";
import { accountStore } from "./Stores/accountStore";
import { navigationStore } from "./Stores/navigation";

const store = configureStore({
    reducer: {
        account: accountStore.reducer,
        navigation: navigationStore.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;