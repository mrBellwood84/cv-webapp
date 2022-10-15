import { Button, Tooltip } from "@mui/material"
import { useTranslation } from "react-i18next"
import LanguageIcon from "@mui/icons-material/Language"
import i18n from "../../../i18n"
import { useAppDispatch } from "../../../Core/Store/hooks"
import { utilStore } from "../../../Core/Store/Stores/utilsStore"

export const LanguageButton = () => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const lang = i18n.language.toUpperCase()

    const openDialog = () => dispatch(utilStore.actions.setShowLanguageDialog(true));



    return (
        <Tooltip title={t("selectLanguage")}>
            <Button color="inherit" startIcon={<LanguageIcon />} onClick={openDialog}>
                {lang}
            </Button>
        </Tooltip>
    )
}