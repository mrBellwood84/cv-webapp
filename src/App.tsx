import { MainNoUser } from "./View/MainNoUser";
import { MainUser } from "./View/MainUser";

const App = () => {

    // const account = useAppSelector((state) => state.account.account);
    const account = true;

    return (
        Boolean(account) ? <MainUser /> : <MainNoUser />
    )
}

export default App;