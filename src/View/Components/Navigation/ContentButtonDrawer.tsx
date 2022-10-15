import { Home, School, Work, DataObject, FolderShared, PictureAsPdf, ManageAccounts, Close } from "@mui/icons-material";
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, SxProps } from "@mui/material"
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks";
import { utilStore, ViewKey } from "../../../Core/Store/Stores/utilsStore";
import { ContentButton } from "./ContentButton";

interface IProps {
    sx?: SxProps;
}

export const ContentButtonDrawer = ({sx}: IProps) => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.utils.contentButtonDrawerOpen);
    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin";

    const handleClose = () => dispatch(utilStore.actions.toggleContentButtonDrawer(false));

    const handleButtonClick = (key: ViewKey) => {
        dispatch(utilStore.actions.setActiveView(key))
        handleClose()
    }

    return (
        <Drawer 
            sx={{...sx}}
            anchor="left"
            open={open}
            onClose={handleClose}
        >
            <List>
                <ListItemButton onClick={handleClose}>
                    <ListItemIcon>
                        <Close color="primary" />
                    </ListItemIcon>
                    <ListItemText color="primary">
                        {t("close")}
                    </ListItemText>
                </ListItemButton>
                <Divider />

                {isAdmin && (
                    <Fragment>
                        <ContentButton text={t("manageUsers")} svg={ManageAccounts} onClick={() => {handleButtonClick("manageUsers")}} />
                        <Divider />
                    </Fragment>
                )}
                <ContentButton text={t("home")} svg={Home} onClick={() => handleButtonClick("home")} />
                <ContentButton text={t("education")} svg={School} onClick={() => handleButtonClick("education")} />
                <ContentButton text={t("experience")} svg={Work} onClick={() => handleButtonClick("experience")} />
                <ContentButton text={t("skills")}  svg={DataObject} onClick={() => handleButtonClick("skills")} />
                <ContentButton text={t("portfolio")} svg={FolderShared} onClick={() => handleButtonClick("portfolio")} />
                <Divider />
                <ContentButton text={t("exportPdf")} svg={PictureAsPdf} onClick={() => alert("not implemented")} />

            </List>

        </Drawer>
    )
}