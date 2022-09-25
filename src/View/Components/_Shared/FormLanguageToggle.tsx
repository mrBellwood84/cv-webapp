import { SxProps, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
    language: string; 
    setLanguage: Dispatch<SetStateAction<string>>
    sx?: SxProps;
}

export const FormLanguageToggle = ({language, setLanguage, sx}: IProps) => {

    const { t } = useTranslation()

    const handleLanguageSwitch = (
        event: React.MouseEvent<HTMLElement>,
        lang: string,
    ) => {
        if (language === lang || !lang || !language) return;
        setLanguage(lang);
    }

    return (
        <ToggleButtonGroup
            size="small"
            color="primary"
            value={language}
            exclusive
            onChange={handleLanguageSwitch}
            sx={{...sx}}
        >
            <ToggleButton value="no">
                {t("norwegian")}
            </ToggleButton>
            <ToggleButton value="en">
                {t("english")}
            </ToggleButton>
        </ToggleButtonGroup>
    )
}