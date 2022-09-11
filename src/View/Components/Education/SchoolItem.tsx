import { Box, Typography } from "@mui/material"
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
            
            <Box sx={{display: "flex", flexDirection:"row", alignItems: "center"}}>
                <Typography variant="h6" component="div">
                    {item.schoolName.find(x => x.code === lang)?.content}
                </Typography>
                <Typography variant="body2" component="div" sx={{ml: "auto", pl: 4, fontWeight: 500}}>
                    {createYearMonthSpan(lang, item.start, item.end).toUpperCase()}
                </Typography>
            </Box>

            <Typography variant="body1" component="div" sx={{fontWeight: 500}}>
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