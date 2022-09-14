import { Box } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import { LanguageButton } from "../Misc/LanguageButton"


export const Appbar = () => {

    const { t } = useTranslation();

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        DEV :: Logo
                    </Typography>
                    <LanguageButton />
                    <Button color="inherit"> {t("signout")} </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}