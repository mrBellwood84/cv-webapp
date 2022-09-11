import { Box, Paper, Typography } from "@mui/material"
import { ISchool } from "../../../Core/Data/ISchool"
import { useAppSelector } from "../../../Core/Store/hooks"
import { createYearMonthSpan } from "../../../Core/Utils/dateTools"

interface IProps {
    item: ISchool
}

export const SchoolItem = ({item}: IProps) => {
    
    const lang = useAppSelector((state) => state.utils.language);

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            
            <Box sx={{display: "flex", flexDirection:"row", alignItems: "baseline"}}>
                <Typography variant="h6" component="div">
                    {item.schoolName.find(x => x.code === lang)?.content}
                </Typography>
                <Typography variant="overline" component="div" sx={{ml: "auto", pl: 2}}>
                    {createYearMonthSpan(lang, item.start, item.end)}
                </Typography>
            </Box>

            <Typography variant="subtitle2" component="div">
                {item.courseName.find(x => x.code === lang)?.content}
            </Typography>


            {item.text && (
                <Typography variant="body2" component="div">
                    {item.text.find(x => x.code === lang)?.content}
                </Typography>
            )}
        </Box>
    )
}