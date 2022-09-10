import { Fragment } from "react"
import { Appbar } from "./Components/Misc/Appbar"
import { Dashboard } from "./Components/Misc/Dashboard"

export const MainUser = () => {
   return (
    <Fragment>
        <Appbar />
        <Dashboard />
    </Fragment>
   )
}