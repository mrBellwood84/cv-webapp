import { useEffect } from "react";
import { useAppDispatch } from "./Core/Store/hooks";
import { utilStore } from "./Core/Store/Stores/utils";
import i18n from "./i18n";
import { MainNoUser } from "./View/MainNoUser";
import { MainUser } from "./View/MainUser";

const App = () => {

    const dispatch = useAppDispatch()

    // const account = useAppSelector((state) => state.account.account);
    const account = true;


    useEffect(() => {
        const setLanguageInState = () => {
            const language = i18n.language
            dispatch(utilStore.actions.setLanguage(language))

        }

        setLanguageInState()
    }, [dispatch])

    return (
        Boolean(account) ? <MainUser /> : <MainNoUser />
    )
}

export default App;