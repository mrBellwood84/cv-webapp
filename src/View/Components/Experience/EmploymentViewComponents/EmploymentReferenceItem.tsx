import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { IReference } from "../../../../Core/Data/Shared/IReference"
import { useAppSelector } from "../../../../Core/Store/hooks"

interface IProps {
    item: IReference
}

export const EmploymentReferenceItem = ({item}: IProps) => {

    const { t } = useTranslation()
    const lang = useAppSelector(state => state.utils.language)


    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(3, max-content)",
        }}>
            <Typography variant="body2" component="div" sx={{gridRow: 1}}>
                {item.name}
            </Typography>

            <Typography variant="body2" component="div" sx={{gridRow: 2}} >
                {item.role.find(x => x.code === lang)?.content}
            </Typography>
            
            {item.phonenumber && (
                <Typography variant="subtitle2" component="div" sx={{gridRow: 3}}>
                    {`${t("phonenumberShort")}: ${item.phonenumber}`}
                </Typography>
            )}

            {item.email && (
                <Typography variant="subtitle2" component="div" sx={{gridRow: 4}}>
                    {`${t("email")}: ${item.email}`}
                </Typography>
            )}
        </Box>
    )
}