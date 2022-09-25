import { Box } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { cookeHandler } from "../../../Core/Utils/cookieHandler"
import { LanguageButton } from "../Misc/LanguageButton"


export const Appbar = () => {

    const { t } = useTranslation();

    const [sessionTime, setSessionTime] = useState<string>("")

    const signOut = () => {
        cookeHandler.remove()
        window.location.reload();
    }

    useEffect(() => {

        const calcSessionExpire = () => {
            const sessionExpire = new Date(cookeHandler.expireIso())
            const now = new Date()
            const remaining = sessionExpire.getTime() - now.getTime()

            if (remaining <= 0) signOut()

            const asString = `${Math.round(remaining / 1000 / 60)}`
            setSessionTime(asString)
        }

        calcSessionExpire()

        const interval = setInterval(() => {
            calcSessionExpire()
        }, 30000)
        return () => clearInterval(interval)
    },[sessionTime])

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        DEV :: Logo
                    </Typography>

                    <Typography variant="caption" component="div" sx={{flexGrow: 1}}>
                        {`${t("sessionExpire")} ${sessionTime} ${t("minutes")}`}
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