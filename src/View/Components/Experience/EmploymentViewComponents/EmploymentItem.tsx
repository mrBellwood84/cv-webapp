import { Edit } from "@mui/icons-material"
import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { IEmployment } from "../../../../Core/Data/Experience/IEmployment"
import { useAppDispatch, useAppSelector } from "../../../../Core/Store/hooks"
import { employmentStore } from "../../../../Core/Store/Stores/employmentStore"
import { utilStore } from "../../../../Core/Store/Stores/utilsStore"
import { createYearMonthSpan } from "../../../../Core/Utils/dateTools"
import { EmploymentPositionItem } from "./EmploymentPositionItem"
import { EmploymentReferenceItem } from "./EmploymentReferenceItem"

interface IProps {
    item: IEmployment
}

export const EmploymentItem = ({item}: IProps) => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const isAdmin = useAppSelector(state => state.account.account?.role) === "admin"
    const lang = useAppSelector(state => state.utils.language);

    const handleEditClick = () => {
        dispatch(employmentStore.actions.setSelectedEmployment(item));
        dispatch(utilStore.actions.setActiveView("editEmployment"));
    }
    
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "max-content auto max-content max-content",
            gridTemplateRows: "repeat(5, max-content)",
            gridGap: 4,
            alignItems: "baseline"
        }}>

            <Typography variant="subtitle1" component="div" sx={{gridRow: 1, gridColumn: 1,  fontWeight: 600}}>
                {item.employer}
            </Typography>

            <Typography 
                variant="caption" 
                component="div" 
                sx={{
                    gridRow: 1, gridColumn: 2,
                    textAlign: "right",
                    mr: isAdmin ? 2 : 0,
                }}>
                {createYearMonthSpan(lang, item.startDate, item.endDate)}
            </Typography>

            {item.positions &&  (<Box sx={{ gridRow: 2, gridColumn: "1 / 3" }}>
                {item.positions.sort((a,b) => {
                    if (a.startDate! < b.startDate!) return -1;
                    return 1
                }).map(item => (
                    <EmploymentPositionItem key={item.id} item={item} />
                ))}
            </Box>)}

            {item.references && item.references.length > 0 && (
                <Fragment>
                    <Divider sx={{gridRow: 3, gridColumn: "1 / 3", ml: 4, mr: 4}} orientation="horizontal" light={true}>
                        <Typography variant="caption" component="div">
                            {t("reference")}
                        </Typography>
                    </Divider>
                    <Box sx={{ gridRow: 4, gridColumn: "1 / 3"}}>
                        {item.references.map(item => (
                            <EmploymentReferenceItem key={item.id} item={item} />
                        ))}
                    </Box>
                </Fragment>
            )}

            {isAdmin && (
                <Box sx={{
                    gridColumn: 3, gridRow: "1/3",
                    borderLeft: "1px solid lightgray"
                }}>
                    <Tooltip title={t("edit")} sx={{ml: 1, p: 1}}>
                        <IconButton onClick={handleEditClick}>
                            <Edit color="primary" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

        </Box>
    )
}