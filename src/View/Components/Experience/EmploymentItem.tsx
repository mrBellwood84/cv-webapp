import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { IEmployment } from "../../../Core/Data/IEmployment"
import { useAppSelector } from "../../../Core/Store/hooks"
import { createYearMonthSpan } from "../../../Core/Utils/dateTools"

interface IProps {
    item: IEmployment
}

export const EmploymentItem = ({item}: IProps) => {

    const { t } = useTranslation()
    const lang = useAppSelector((state) => state.utils.language)

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>

            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", mb: 1}}>
                <Typography variant="h6" component="div">
                    {item.employer}
                </Typography>
                <Typography variant="body2" component="div" sx={{ml: "auto", pl: 4, fontWeight: 500}}>
                    {createYearMonthSpan(lang, item.startDate, item.endDate).toUpperCase()}
                </Typography>
            </Box>

            {item.positions.sort((a,b) => {
                if (a.startDate! > b.startDate!) return -1
                else return 1
            })
                .map(x => (
                <Box key={x.id} sx={{mb: 1}} >
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography variant="body1" component="div" sx={{fontWeight: 500}}>
                            {x.header.find(x => x.code === lang)?.content}
                        </Typography>
                        <Typography variant="caption" component="div" sx={{ml: "auto", pl: 4}}>
                            {x.startDate?.getFullYear()} -{x.endDate && ` ${x.endDate.getFullYear()}`}
                        </Typography>
                    </Box>
                    <Typography variant="body2" component="div">
                        {x.text?.find(x => x.code === lang)?.content}
                    </Typography>
                </Box>
            ))}

                <Typography variant="body2" component="div" sx={{mt: 1, fontStyle: "oblique", fontWeight: 500}}>
                    {t("reference")}
                </Typography>

                {item.reference.map(x => (
                    <Box key={x.id} sx={{width: "max-content", minWidth: "50%"}}>
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", mt:1}}>
                            <Typography variant="body2" component="div" sx={{fontWeight: 500}}>
                                {x.name}
                            </Typography>
                        <Typography variant="body2" component="div" sx={{ml: "auto", pl: 4}}>
                                {x.role.find(x => x.code === lang)?.content}
                            </Typography>
                        </Box>
                        <Typography variant="caption" component="div">
                            {x.phonenumber}
                        </Typography>
                        <Typography variant="caption" component="div">
                            {x.email}
                        </Typography>
                    </Box>
                ))}
        </Box>
    )
}