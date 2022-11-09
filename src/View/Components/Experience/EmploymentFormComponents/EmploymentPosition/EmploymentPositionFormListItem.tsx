import { Box, IconButton, ListItem, Tooltip, Typography } from "@mui/material";
import { IExperience } from "../../../../../Core/Data/Experience/IExperience"
import { useAppSelector } from "../../../../../Core/Store/hooks";
import { findContentByLanguage } from "../../../../../Core/Utils/languageTools";
import { createYearMonthSpan } from "../../../../../Core/Utils/dateTools";
import { Delete, Edit, Remove } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { EmploymentPositionFormDialog } from "./EmploymentPositionFormDialog";
import { useState } from "react";

interface IProps {
    item: IExperience;
    editItem: (item: IExperience) => void;
    removeItem: (item: IExperience) => void;
}

export const EmploymentExperienceListItem = ({item, editItem, removeItem}: IProps ) => {

    const lang = useAppSelector((state) => state.utils.language)
    const { t } = useTranslation();

    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);


    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "auto max-content max-content",
            gridTemplateRows: "repeat(3, max-content)",
            gridGap: 1, p: 1,
        }}>

            <EmploymentPositionFormDialog 
                isOpen={editDialogOpen} 
                handleClose={() => setEditDialogOpen(false)}
                item={item}
                handleData={editItem} />

            <Typography 
                variant="subtitle2"
                component="div"
                sx={{ gridRow: 1, gridColumn: 1}} >
                {findContentByLanguage(item.header, lang)}
            </Typography>

            {item.startDate && (
                <Typography variant="caption" component="div" sx={{gridrow:2, gridColumn:1}}>
                    {createYearMonthSpan(lang, item.startDate, item.endDate, true)}
                </Typography>
            )}

            <Typography variant="body1" component="div" sx={{gridRow: 3, gridColumn: 1}}>
                {findContentByLanguage(item.text, lang)}
            </Typography>

            <Tooltip title={t("edit")} sx={{gridRow: "1 / 4", gridColumn: 2, display: "flex", justifyContent: "center", alignItems: "center", m: "auto"}}>
                <IconButton onClick={() => setEditDialogOpen(true)} >
                    <Edit color="primary" />
                </IconButton>
            </Tooltip>

            <Tooltip title={t("remove")} sx={{gridRow: "1 / 4", gridColumn: 3, display: "flex", justifyContent: "center", alignItems: "center", m: "auto"}}>
                <IconButton onClick={() => removeItem(item)}>
                    <Delete color="error" />
                </IconButton>
            </Tooltip>

        </Box>
    )
}