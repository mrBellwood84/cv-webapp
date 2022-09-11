import { Box, Typography } from "@mui/material"
import { IExperience } from "../../../Core/Data/IExperience"
import { useAppSelector } from "../../../Core/Store/hooks"
import { createYearMonthSpan } from "../../../Core/Utils/dateTools"

interface IProps {
    item: IExperience
}

export const OtherEducItem = ({item}: IProps) => {

    const lang = useAppSelector((state) => state.utils.language)

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>

            <Box sx={{display: "flex", flexDirection:"row", alignItems: "baseline"}}>
                <Typography variant="h6" component="div">
                    {item.header.find(x => x.code === lang)?.content}
                </Typography>
                {item.startDate && (
                    <Typography variant="overline" component="div" sx={{ml: "auto",pl: 2}}>
                        {createYearMonthSpan(lang, item.startDate, item.endDate, true)}
                    </Typography>
                )}
            </Box>

            {item.subheader && (
                <Typography variant="subtitle2" component="div">
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