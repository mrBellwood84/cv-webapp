import { Box } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { accountStore } from "../../../Core/Store/Stores/accountStore"
import { tokenStorage } from "../../../Core/Utils/storageTools"
import { LanguageButton } from "../Misc/LanguageButton"


export const Appbar = () => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch()

    const signOut = () => {
        tokenStorage.remove()
        dispatch(accountStore.actions.setAccount(undefined))
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        DEV :: Logo
                    </Typography>
                    <LanguageButton />
                    <Button 
                        color="inherit" 
                        variant="outlined"
                        sx={{ml: 1}}
                        onClick={signOut}> {t("signout")} </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}