import { School, SchoolOutlined } from "@mui/icons-material";
import { Box, Rating, Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next";

interface IRateBoxProps {
    value: number;
    i18nKey: string;
}

const RateBox = ({value, i18nKey}: IRateBoxProps) => {
    const { t } = useTranslation()
    return (
        <Box sx={{display: "flex"}}>
            <Rating 
                value={value}
                icon={<School sx={{color: "gray"}} fontSize="small" />}
                emptyIcon={<SchoolOutlined  fontSize="small"/>}
                readOnly />
                <Typography variant="caption" component="div" sx={{ml: 1}}>
                    {t(i18nKey)}
                </Typography>

        </Box>
    )
}

export const SkillRatingExplained = () => {

    return (
        <Box sx={{display:"flex", justifyContent: "center", mt: 4}}>
            <Stack spacing={0.5} sx={{mt: 2}}>
                <RateBox value={5} i18nKey="rate5" />
                <RateBox value={4} i18nKey="rate4" />
                <RateBox value={3} i18nKey="rate3" />
                <RateBox value={2} i18nKey="rate2" />
                <RateBox value={1} i18nKey="rate1" />
            </Stack>
        </Box>
    )
}