import { Edit, Delete } from "@mui/icons-material";
import { Box, IconButton, SxProps, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IReference } from "../../../../../Core/Data/Shared/IReference"
import { useAppSelector } from "../../../../../Core/Store/hooks";
import { findContentByLanguage } from "../../../../../Core/Utils/languageTools";
import { EmploymentReferenceFormDialog } from "./EmploymentReferenceFormDialog";

interface IProps {
    item: IReference,
    editItem: (item: IReference) => void;
    removeItem: (item: IReference) => void;
    sx?: SxProps;
}

export const EmploymentReferenceFormListItem = ({ item, editItem, removeItem, sx }: IProps) => {

    const lang = useAppSelector((state) => state.utils.language)
    const { t } = useTranslation()

    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "max-content auto max-content max-content",
            gridTemplateRows: "repeat(4, max-content)",
            gridGap: 1, p: 1
        }}>
            <EmploymentReferenceFormDialog
                isOpen={editDialogOpen}
                handleClose={() => setEditDialogOpen(false)}
                item={item}
                handleData={editItem} />

            <Typography variant="body1" component="div" sx={{gridRow: 1, gridColumn: "1 / 3"}}>
                {item.name}
            </Typography>

            <Typography variant="caption" component="div" sx={{gridRow: 2, gridColumn: "1 / 3"}}>
                {findContentByLanguage(item.role, lang)}
            </Typography>

            <Typography variant="body2" component="div" sx={{gridRow: 3, gridColumn: 1}}>
                {`${t("email")}: ${item.email}`}
            </Typography>

            <Typography variant="body2" component="div" sx={{gridRow: 3, gridColumn: 2, ml: 1}}>
                {`${t("phonenumberShort")} : ${item.phonenumber}`}
            </Typography>

            <Tooltip title={t("edit")} sx={{gridRow: "1 / 4", gridColumn: 3, display: "flex", justifyContent: "center", alignItems: "center", m: "auto"}}>
                <IconButton onClick={() => setEditDialogOpen(true)} >
                    <Edit color="primary" />
                </IconButton>
            </Tooltip>

            <Tooltip title={t("remove")} sx={{gridRow: "1 / 4", gridColumn: 4, display: "flex", justifyContent: "center", alignItems: "center", m: "auto"}}>
                <IconButton onClick={() => removeItem(item)}>
                    <Delete color="error" />
                </IconButton>
            </Tooltip>
        </Box>
    )
}