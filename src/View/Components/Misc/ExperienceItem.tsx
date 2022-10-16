import { Edit } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { IExperience } from "../../../Core/Data/Experience/IExperience"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { educationStore } from "../../../Core/Store/Stores/educationStore"
import { employmentStore } from "../../../Core/Store/Stores/employmentStore"
import { utilStore } from "../../../Core/Store/Stores/utilsStore"
import { createYearMonthSpan, createYearMonthString } from "../../../Core/Utils/dateTools"

interface IProps {
    item: IExperience
}

export const ExperienceItem = ({item}: IProps) => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin";
    const lang = useAppSelector((state) => state.utils.language);

    const viewKey = item.type === "education" ? "editEducationExperience" : "editOtherExperience"

    const handleEditClick = () => {
        if (item.type === "education") dispatch(educationStore.actions.setSelectedOther(item))
        if (item.type === "other") dispatch(employmentStore.actions.setSelectedOtherExperience(item))
        dispatch(utilStore.actions.setActiveView(viewKey))
    }

    return (

        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "auto auto max-content",
                gridTemplateRows: "repeat(3, max-content)",
                width: "100%",
            }}
        >
            <Typography variant="subtitle1" component="div"
                sx={{gridRow: 1, gridColumn: 1, fontWeight: 600}}>
                    {item.header.find(x => x.code === lang)?.content!}
            </Typography>

            {item.subheader.length > 0 && (
                <Typography variant="subtitle1" component="div"
                    sx={{gridRow: 2, gridColumn: 1}}>
                        {item.subheader.find(x => x.code === lang)?.content}
                </Typography>
            )}
            
            {item.text.length > 0 && (
                <Typography variant="body2" component="div"
                    sx={{gridRow: 3, gridColumn: 1}}>
                        {item.text.find(x => x.code === lang)?.content}
                </Typography>
            )}

            {item.startDate && !item.endDate && (
                <Typography
                    sx= {{
                        gridRow: "1 / 3", gridColumn: 2,
                        mr: isAdmin ? 2 : 0,
                        justifySelf: "right", textAlign: "right",
                    }}
                    variant="caption"
                    component="div">
                        {createYearMonthString(lang, item.startDate)}
                </Typography>
            )}

            {item.startDate && item.endDate && (
                <Typography
                    sx= {{
                        gridRow: "1 / 3", gridColumn: 2,
                        mr: isAdmin ? 2 : 0,
                        justifySelf: "right", textAlign: "right",
                    }}
                    variant="caption"
                    component="div">
                        {createYearMonthSpan(lang, item.startDate, item.endDate)}
                </Typography>
            )}

            {isAdmin && (
                <Box sx={{ 
                    gridColumn: 3, gridRow: "1 / 4", 
                    borderLeft: "1px solid lightgrey",
                    alignSelf:"center" }}>
                    <Tooltip title={t("edit")} sx={{ml: 1, p: 1 }}>
                        <IconButton onClick={handleEditClick}>
                            <Edit color="primary" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        </Box>
    )
}