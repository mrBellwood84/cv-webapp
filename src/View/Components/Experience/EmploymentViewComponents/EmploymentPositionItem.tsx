import { Box, Typography } from "@mui/material"
import { IExperience } from "../../../../Core/Data/Experience/IExperience"
import { useAppSelector } from "../../../../Core/Store/hooks"
import { createYearMonthSpan } from "../../../../Core/Utils/dateTools"

interface IProps {
    item: IExperience
}

export const EmploymentPositionItem = ({item}: IProps) => {

    const lang = useAppSelector(state => state.utils.language)

    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: ("repeat(3, max-content)"),
        }} >
            <Typography variant="body1" component="div" sx={{gridRow: 1}}>
                {item.header.find(x => x.code === lang)?.content}
            </Typography>

            <Typography variant="caption" component="div" sx={{gridRow: 2}}>
                {createYearMonthSpan(lang, item.startDate!, item.endDate)}
            </Typography>

            <Typography variant="body2" component="div" sx={{gridRow: 3}}>
                {item.text.find(x => x.code === lang)?.content}
            </Typography>

        </Box>
    )
}