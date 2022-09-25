import { Box, Typography } from "@mui/material"
import { IExperience } from "../../../Core/Data/IExperience"
import { useAppSelector } from "../../../Core/Store/hooks"
import { createYearMonthSpan } from "../../../Core/Utils/dateTools"

interface IProps {
    item: IExperience
}

export const ExperienceItem = ({item}: IProps) => {

    const lang = useAppSelector((state) => state.utils.language)

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>

            <Box sx={{display: "flex", flexDirection:"row", alignItems: "center"}}>
                <Typography variant="h6" component="div">
                    {item.header.find(x => x.code === lang)?.content}
                </Typography>
                {item.startDate && (
                    <Typography variant="body2" component="div" sx={{ml: "auto", pl: 4, fontWeight: 500}}>
                        {createYearMonthSpan(lang, item.startDate.toISOString(), item.endDate?.toISOString(), true).toUpperCase()}
                    </Typography>
                )}
            </Box>

            {item.subheader && (
                <Typography variant="body1" component="div" sx={{fontWeight: 500}}>
                    {item.subheader.find(x => x.code === lang)?.content}
                </Typography>
            )}

            {item.text && (
                <Typography variant="body2" component="div">
                    {item.text.find(x => x.code === lang)?.content}
                </Typography>
            )}

        </Box>
    )
}