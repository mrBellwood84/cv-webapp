import { AddCircle } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { experienceAgent } from "../../../Core/ApiAgent/experienceAgent"
import { schoolAgent } from "../../../Core/ApiAgent/schoolAgent"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { educationStore } from "../../../Core/Store/Stores/educationStore"
import { utilStore } from "../../../Core/Store/Stores/utils"
import { ExperienceItem } from "../Misc/ExperienceItem"
import { SectionStack } from "../_Shared/SectionStack"
import { SchoolItem } from "./SchoolItem"

export const EducationContainer = () => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [apiLoading, setApiLoading] = useState<boolean>(false)

    const school = useAppSelector((state) => state.education.schools);
    const otherEduc = useAppSelector((state) => state.education.otherEduc);
    const role = useAppSelector((state) => state.account.account?.role);

    const handleAddEducation = () => {
        dispatch(educationStore.actions.removeSelected());
        dispatch(utilStore.actions.setActiveView("addEducation"));
    }

    useEffect(() => {

        const loadSchoolData = async () => {
            if (school.length !== 0) return;
            try {
                const result = await schoolAgent.getAllSchool()
                if (typeof(result) === "number") {
                    console.error(result, "could not fetch school data")
                    return
                }
                dispatch(educationStore.actions.setSchoolList(result))
            } catch {
                console.error(500, "could not fetch school data")
            }
        }

        const loadEducExp = async () => {
            if (otherEduc.length !== 0) return
            try {
                const result = await experienceAgent.getEducationExperience()
                if (typeof(result) === "number") {
                    console.error(result, "DEV :: could not fetch other educ experience from server")
                    return
                }
                dispatch(educationStore.actions.setOthersList(result))
            } catch {
                console.error(500, "DEV :: Something went wrong with fetchin data froms server")
            }
        }

        const loadData = async () => {
            setApiLoading(true)
            await loadSchoolData()
            await loadEducExp()
            setApiLoading(false)
        }

        loadData()


    }, [dispatch, school.length])

    if (apiLoading) {
        return <div>API Loading</div>
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
                    {school
                        .map(x => (
                        <SchoolItem key={x.id} item={x} />
                    ))}
                </SectionStack>
            )}

            {otherEduc && (otherEduc.length > 0) && (
                <SectionStack title={`${t("courses")} / ${t("certifications")} / ${t("other")}`}>
                    {otherEduc.map(x => (
                        <ExperienceItem key={x.id} item={x} />
                    ))}
                </SectionStack>
            )}
        </Fragment>
    )
}