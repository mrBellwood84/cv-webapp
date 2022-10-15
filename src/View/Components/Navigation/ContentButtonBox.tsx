import { Box, Divider, List, SxProps, Theme } from "@mui/material"
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks";
import { utilStore, ViewKey } from "../../../Core/Store/Stores/utilsStore";
import { ContentButton } from "./ContentButton";
import {
    DataObject,
    FolderShared,
    Home,
    ManageAccounts,
    PictureAsPdf,
    School,
    Work,

} from "@mui/icons-material"
import { Fragment } from "react";

interface IProps {
    sx?: SxProps<Theme>;
}

export const ContentButtonBox = ({sx}: IProps) => {

    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin";

    const btnClick = (key: ViewKey) => {
        dispatch(utilStore.actions.setActiveView(key));
    }

    return (
        <Box sx={{...sx, width: "100%", maxWidth: 360, bgcolor: ""}}>
            <List>
                {isAdmin && (
                    <Fragment>
                        <ContentButton text={t("manageUsers")} svg={ManageAccounts} onClick={() => btnClick("manageUsers")} />
                        <Divider />
                    </Fragment>
                )}
                <ContentButton text={t("home")} svg={Home} onClick={() => btnClick("home")} />
                <ContentButton text={t("education")} svg={School} onClick={() => btnClick("education")} />
                <ContentButton text={t("experience")} svg={Work} onClick={() => btnClick("experience")} />
                <ContentButton text={t("skills")}  svg={DataObject} onClick={() => btnClick("skills")} />
                <ContentButton text={t("portfolio")} svg={FolderShared} onClick={() => btnClick("portfolio")} />
                <Divider />
                <ContentButton text={t("exportPdf")} svg={PictureAsPdf} onClick={() => alert("not implemented")} />
            </List>
        </Box>
    )
}