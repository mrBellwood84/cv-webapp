import { Edit } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { IExperience } from "../../../Core/Data/IExperience"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { educationStore } from "../../../Core/Store/Stores/educationStore"
import { utilStore } from "../../../Core/Store/Stores/utils"
import { createYearMonthSpan, createYearMonthString } from "../../../Core/Utils/dateTools"

interface IProps {
    item: IExperience
}

export const ExperienceItem = ({item}: IProps) => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin";
    const lang = useAppSelector((state) => state.utils.language);

    const handleEditClick = () => {
        dispatch(educationStore.actions.setSelectedOther(item))
        dispatch(utilStore.actions.setActiveView("editExperience"))
    }

    return (

        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "auto max-content max-content",
                gridTemplateRows: "repeat(3, max-content)",
                width: "100%",
                alignItems: "center"
            }}
        >

            <Typography
                sx={{gridRow: 1, gridColumn: 1}}
                variant="h6"
                component="div"
            >
                {item.header.find(x => x.code === lang)?.content}
            </Typography>

            {item.subheader && (
                <Typography
                    sx={{gridRow: 2, gridColumn: 1}}
                    variant="subtitle2"
                    component="div"
                >
                    {item.subheader.find(x => x.code === lang)?.content}
                </Typography>
            )}

            {item.text && (
                <Typography
                    sx={{gridRow: 3, gridColumn: "1 / 3"}}
                    variant="body1"
                    component="div"
                >
                    {item.text.find(x => x.code === lang)?.content}
                </Typography>
            )}

            {item.startDate && !item.endDate && (
                <Typography
                    sx={{gridRow: 1, gridColumn: 2}}
                    variant="subtitle2"
                    component="div"
                >
                    {createYearMonthString(lang, item.startDate)}
                </Typography>
            )}

            {item.startDate && item.endDate && (
                <Typography
                    sx={{gridRow: 1, gridColumn: 2}}
                    variant="subtitle2"
                    component="div"
                >
                    {createYearMonthSpan(lang, item.startDate, item.endDate)}
                </Typography>
            )}

            {isAdmin && (
                <Tooltip
                    sx={{
                        gridColumn: 3, gridRow: "1 / 4",
                        ml: 2, p: 2
                    }}
                    title={t("edit")}
                >
                    <IconButton onClick={handleEditClick}>
                        <Edit color="primary" />
                    </IconButton>
                </Tooltip>
            )}


        </Box>
    )
}