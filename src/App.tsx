import { useEffect } from "react";
import { accountAgent } from "./Core/ApiAgent/accountAgent";
import { IAccount } from "./Core/Data/Account/IAccount";
import { useAppDispatch, useAppSelector } from "./Core/Store/hooks";
import { accountStore } from "./Core/Store/Stores/accountStore";
import { utilStore } from "./Core/Store/Stores/utilsStore";
import { cookeHandler } from "./Core/Utils/cookieHandler";
import i18n from "./i18n";
import { MainNoUser } from "./View/MainNoUser";
import { MainUser } from "./View/MainUser";

const App = () => {

    const dispatch = useAppDispatch()

    const account = useAppSelector((state) => state.account.account);

    useEffect(() => {

        const setLanguageInState = () => {
            const language = i18n.language
            dispatch(utilStore.actions.setLanguage(language))
        }

        const getCurrentUser = async () => {
            
            let tokenExist = Boolean(cookeHandler.token())
            if (!tokenExist) return;

            let response = await accountAgent.getCurrent();

            if (typeof(response) === "number") {
                cookeHandler.remove()
                return
            }

            const account: IAccount = {
                firstName: response.firstName,
                lastName: response.lastName,
                username: response.lastName,
                company: response.company,
                role: response.role,
                email: response.email,
                accountExpire: response.accountExpire,
            }

            dispatch(accountStore.actions.setAccount(account));
        }

        setLanguageInState()
        getCurrentUser()

    }, [dispatch])

    return (
        Boolean(account) ? <MainUser /> : <MainNoUser />
    )
}

export default App;