import { AccessTimeSharp, Language, Logout, Menu as MenuIcon, Settings } from "@mui/icons-material"
import { Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, SxProps, Tooltip } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { cookeHandler } from "../../../Core/Utils/cookieHandler"
import { LanguageButton } from "../Misc/LanguageButton"
import i18n, { supportedLanguages } from "../../../i18n";
import { useAppDispatch } from "../../../Core/Store/hooks"
import { utilStore } from "../../../Core/Store/Stores/utils"


interface IProps {
    sx?: SxProps
}

export const Appbar = ({sx}: IProps) => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch()

    const langQuery = supportedLanguages.find(x => x.code === i18n.language.toLowerCase())
    const langFull = langQuery ? langQuery.name : ""

    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null)
    const [sessionTime, setSessionTime] = useState<string>("")


 
    const openAccountNav = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const closeAccountNav = () => setAnchorElNav(null)

    const signOut = () => {
        cookeHandler.remove()
        window.location.reload();
    }

    const handleDropdownSelectLanguage = () => {
        dispatch(utilStore.actions.setShowLanguageDialog(true));
        closeAccountNav()
    }


    useEffect(() => {

        const calcSessionExpire = () => {
            const sessionExpire = new Date(cookeHandler.expireIso())
            const now = new Date()
            const remaining = sessionExpire.getTime() - now.getTime()

            if (isNaN(remaining)) signOut()

            const asString = `${Math.round(remaining / 1000 / 60)}`
            setSessionTime(asString)
        }

        calcSessionExpire()

        const interval = setInterval(() => {
            calcSessionExpire()
        }, 1000)
        return () => clearInterval(interval)
    },[sessionTime])

    return (
        <AppBar sx={{
            position: "relative",
            ...sx,
        }}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
            
                <Typography 
                    sx={{
                        cursor: "pointer",
                        display: {xs: "none", md: "block"}
                    }}
                    variant="h6" 
                    component="div" 
                    onClick={() => dispatch(utilStore.actions.setActiveView(""))}>
                    DEV :: Logo
                </Typography>

                <Box sx={{
                    display: {xs: "flex", md:"none"}

                }}>
                    <IconButton 
                        size="large"
                        color="inherit"
                        onClick={() => dispatch(utilStore.actions.toggleContentButtonDrawer(true))}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                <Tooltip title={`${t("sessionExpire")} ${sessionTime} ${t("minutes")}`}>
                    <Box sx={{ display: "flex", alignItems: "center"}}>
                        <AccessTimeSharp />
                        <Typography variant="body1" component="div" sx={{ml: 1}}>
                            {sessionTime}m
                        </Typography>
                    </Box>
                </Tooltip>

                <Box sx={{
                    display: {xs: "none", md: "flex"}
                }}>
                    <LanguageButton />
                    <Button
                        color="inherit"
                        variant="outlined"
                        sx={{ml: 1}}
                        onClick={signOut}
                    >
                        {t("signout")}
                    </Button>
                </Box>

                <Box sx={{display: {sx: "flex", md: "none"}}} >
                    <IconButton
                        onClick={openAccountNav}
                        color="inherit"
                    >
                        <Settings />
                    </IconButton>
                    <Menu
                        sx={{display: {sx: "flex", md: "none"}}}
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={closeAccountNav}
                    >
                        <MenuItem onClick={handleDropdownSelectLanguage}>
                            <ListItemIcon>
                                <Language fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="body1">
                                {langFull}
                            </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="body1">
                                {t("signout")}
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}