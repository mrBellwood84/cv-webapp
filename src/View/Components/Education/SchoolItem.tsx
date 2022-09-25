import { Edit } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography} from "@mui/material"
import { useTranslation } from "react-i18next"
import { ISchool } from "../../../Core/Data/School/ISchool"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { educationStore } from "../../../Core/Store/Stores/educationStore"
import { utilStore } from "../../../Core/Store/Stores/utils"
import { createYearMonthSpan } from "../../../Core/Utils/dateTools"

interface IProps {
    item: ISchool
}

export const SchoolItem = ({item}: IProps) => {
    
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const lang = useAppSelector((state) => state.utils.language);
    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin"

    const handleEditClick = () => {
        dispatch(educationStore.actions.setSelectedSchool(item))
        dispatch(utilStore.actions.setActiveView("editSchool"))
    }
    
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "auto max-content max-content",
            gridTemplateRows: "repeat(3, max-content)",
            width: "100%",
            alignItems: "center"
            
        }}>
            <Typography 
                variant="h6" 
                component="div"
                sx={{
                    gridRow: 1,
                    gridColumn: 1
                }}
            >
                {item.schoolName.find(x => x.code === lang)?.content!}
            </Typography>

            <Typography
                variant="subtitle2"
                component="div"
                sx={{
                    gridRow: 1,
                    gridColumn: 2
                }}
            >
                {createYearMonthSpan(lang, item.startDate, item.endDate)}
            </Typography>

            <Typography
                variant="body1"
                component="div"
                sx={{
                    gridRow: 2,
                    gridColumn: "1 / 3"
                }}
            >
                {item.course.find(x => x.code === lang)!.content}
            </Typography>

            {item.text.length > 0 && (
                <Typography
                    variant="body2"
                    component="div"
                    sx={{
                        mt: 0.3,
                        gridRow: 3,
                        gridColumn: "1/3"
                    }}
                >
                    {item.text.find(x => x.code === lang)?.content}
                </Typography>
            )}

            {isAdmin && (
                <Box sx={{
                    gridColumn: 3,
                    gridRow: "1 / 4",
                }}>
                    <Tooltip title={t("edit")} sx={{
                        ml: 2,
                        p: 2
                    }}>
                        <IconButton onClick={handleEditClick}>
                            <Edit color="primary" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

        </Box>
    )
}