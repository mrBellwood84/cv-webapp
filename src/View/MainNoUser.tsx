import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { LoginBox } from "./Components/Account/LoginBox"
import { LanguageButton } from "./Components/Misc/LanguageButton"
import { LanguageDialog } from "./Components/Misc/LanguageDialog"

export const MainNoUser = () => {

    return (
        <Box sx={{
            minHeight: "100vh",
            width: "100vw",
            display: "grid",
            gridTemplateRows: "max-content 5% max-content auto",
            gridTemplateColumns: "auto max-content auto"
        }}>
            <AppBar sx={{
                gridRow: "1",
                gridColumn: "1 / 4",
                position: "relative"

            }}>
                <Toolbar>
                    <Typography sx={{flexGrow: 1}}>Dev::test</Typography>
                    <LanguageButton />
                </Toolbar>
            </AppBar>

            <LoginBox sx={{gridRow: 3, gridColumn: 2}} />


            <LanguageDialog />
        </Box>
    )
}