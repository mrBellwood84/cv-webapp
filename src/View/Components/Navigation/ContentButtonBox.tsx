import { Box, Divider, List, SxProps, Theme } from "@mui/material"
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../Core/Store/hooks";
import { utilStore } from "../../../Core/Store/Stores/utils";
import { ContentButton } from "./ContentButton";
import {
    DataObject,
    FolderShared,
    Home,
    PictureAsPdf,
    School,
    Work,

} from "@mui/icons-material"

interface IProps {
    sx?: SxProps<Theme>;
}

export const ContentButtonBox = ({sx}: IProps) => {

    const dispatch = useAppDispatch();
    const { t } = useTranslation()

    const btnClick = (key: string) => {
        dispatch(utilStore.actions.setActiveView(key));
    }

    return (
        <Box sx={{...sx, width: "100%", maxWidth: 360, bgcolor: ""}}>
            <List>
                <ContentButton text={t("home")} svg={Home} onClick={() => btnClick("")} />
                <ContentButton text={t("education")} svg={School} onClick={() => btnClick("education")} />
                <ContentButton text={t("experience")} svg={Work} onClick={() => btnClick("experience")} />
                <ContentButton text={t("skills")}  svg={DataObject} onClick={() => btnClick("skills")} />
                <ContentButton text={t("portfolio")} svg={FolderShared} onClick={() => btnClick("projects")} />
                <Divider />
                <ContentButton text={t("exportPdf")} svg={PictureAsPdf} onClick={() => alert("not implemented")} />
            </List>
        </Box>
    )
}