import { AppBar, Toolbar, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { Fragment } from "react"
import { LoginBox } from "./Components/Account/LoginBox"
import { LanguageButton } from "./Components/Misc/LanguageButton"
import { LanguageDialog } from "./Components/Misc/LanguageDialog"

export const MainNoUser = () => {

    return (
        <Fragment>
            <AppBar sx={{gridRow:1}} position="static">
                <Toolbar>
                    <Typography sx={{flexGrow: 1}}>Dev::test</Typography>
                    <LanguageButton />

                </Toolbar>
            </AppBar>
            <Container sx={{gridRow:2}} maxWidth="xs">
                <LoginBox />
            </Container>
            <LanguageDialog />
        </Fragment>
    )
}