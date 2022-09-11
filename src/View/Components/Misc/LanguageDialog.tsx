import { Dialog, DialogTitle, List, ListItemButton, ListItemText } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { utilStore } from "../../../Core/Store/Stores/utils"
import i18n, { supportedLanguages } from "../../../i18n"

export const LanguageDialog = () => {

    const dispath = useAppDispatch()
    const { t } = useTranslation()
    const open = useAppSelector((state) => state.utils.showLanguageDialog)

    const handleClose = () => dispath(utilStore.actions.setShowLanguageDialog(false))
    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code)
        dispath(utilStore.actions.setLanguage(code))
        handleClose()
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
            <DialogTitle> {t("selectLanguage")} </DialogTitle>
            <List>
                {supportedLanguages.map(x => (
                    <ListItemButton key={`langoptbtn-${x.code}`} onClick={() => changeLanguage(x.code)}>
                        <ListItemText inset>
                            {x.name}
                        </ListItemText>
                    </ListItemButton>
                ))}
            </List>
        </Dialog>
    )
}