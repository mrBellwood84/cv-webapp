import { Fragment } from "react"
import { Appbar } from "./Components/Navigation/Appbar"
import { Dashboard } from "./Components/Misc/Dashboard"
import { LanguageDialog } from "./Components/Misc/LanguageDialog"

export const MainUser = () => {

   return (
    <Fragment>
        <Appbar />
        <Dashboard />
        <LanguageDialog />
    </Fragment>
   )
}