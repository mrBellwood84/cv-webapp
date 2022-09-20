import { AddCircle } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { educationStore } from "../../../Core/Store/Stores/education"
import { utilStore } from "../../../Core/Store/Stores/utils"
import { ExperienceItem } from "../Misc/ExperienceItem"
import { SectionStack } from "../_Shared/SectionStack"
import { SchoolItem } from "./SchoolItem"

export const EducationContainer = () => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const school = useAppSelector((state) => state.education.schools);
    const otherEduc = useAppSelector((state) => state.education.others)
    const role = useAppSelector((state) => state.account.account?.role)

    const handleAddEducation = () => {
        dispatch(educationStore.actions.removeSelected());
        dispatch(utilStore.actions.setActiveView("addEducation"));
    }

    return (

        <Fragment>

            {role && (role === "admin") && (
                <Box sx={{display: "flex", justifyContent: "right"}}>
                    <Tooltip title={t("addEducation")}>
                        <IconButton onClick={handleAddEducation}>
                            <AddCircle fontSize="large" color="primary"/>
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

            {school.length === 0 && otherEduc.length === 0 && (
                <Typography variant="h6" component="div">
                    {t("noEducation")}
                </Typography>
            )}

            {school.length > 0 && (
                <SectionStack title={t("school")}>
                    {school.sort((a,b) => {
                        if (a.startDate > b.startDate) return -1;
                        else return 1
                    }).map(x => (
                        <SchoolItem key={x.id} item={x} />
                    ))}
                </SectionStack>
            )}

            {otherEduc && (otherEduc.length > 0) && (
                <SectionStack title={`${t("course")} / ${t("certifications")} / ${t("other")}`}>
                    {otherEduc.map(x => (
                        <ExperienceItem key={x.id} item={x} />
                    ))}
                </SectionStack>
            )}
        </Fragment>
    )
}