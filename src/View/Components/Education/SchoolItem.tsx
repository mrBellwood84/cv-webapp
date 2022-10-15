import { Edit } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography} from "@mui/material"
import { useTranslation } from "react-i18next"
import { ISchool } from "../../../Core/Data/School/ISchool"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { educationStore } from "../../../Core/Store/Stores/educationStore"
import { utilStore } from "../../../Core/Store/Stores/utilsStore"
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
            gridTemplateColumns: "auto auto max-content",
            gridTemplateRows: "repeat(3, max-content)",
            width: "100%",
        }}>

            <Typography variant="subtitle1" component="div"
                sx={{gridRow: 1, gridColumn: 1, fontWeight: 600}}>
                    {item.schoolName.find(x => x.code === lang)?.content!}
            </Typography>

            <Typography variant="subtitle1" component="div"
                sx={{gridRow: 2, gridColumn: 1}}>
                    {item.course.find(x => x.code === lang)?.content!}
            </Typography>

            {item.text.length > 0 && (
                <Typography variant="body2" component="div"
                    sx={{gridRow: 3, gridColumn: 1}}>
                        {item.text.find(x => x.code === lang)?.content!}
                </Typography>
            )}

            <Typography variant="caption" component="div"
                sx={{
                    gridRow: "1 / 2", gridColumn: 2, 
                    mr: isAdmin ? 2 : 0,
                    justifySelf: "right", textAlign: "right"
                     }}>
                    {createYearMonthSpan(lang, item.startDate, item.endDate)}
            </Typography>


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