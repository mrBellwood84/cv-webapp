import { Add } from "@mui/icons-material"
import { Box, Button, SxProps, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { experienceAgent } from "../../../Core/ApiAgent/experienceAgent"
import { schoolAgent } from "../../../Core/ApiAgent/schoolAgent"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { educationStore } from "../../../Core/Store/Stores/educationStore"
import { utilStore } from "../../../Core/Store/Stores/utils"
import { ExperienceItem } from "../Misc/ExperienceItem"
import { ArrowNavigation } from "../Navigation/ArrowNavigation"
import { SectionHeader } from "../_Shared/SectionHeader"
import { SectionStack } from "../_Shared/SectionStack"
import { SchoolItem } from "./SchoolItem"

interface IProps {
    sx: SxProps;
}

export const EducationContainer = ({sx}: IProps) => {

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


    }, [dispatch, school.length, otherEduc.length])

    if (apiLoading) {
        return <div>API Loading</div>
    }

    return (

        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(5, max-content)",
            gridTemplateColumns: "auto",
            gridGap: 5,
            ...sx,
        }} >

            {role && (role === "admin") && (
                <Box sx={{
                    gridRow: 1,
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Button 
                        onClick={handleAddEducation}
                        startIcon={<Add />}>
                            {t("addEducation")}
                    </Button>
                </Box>
            )}

            <Typography 
                sx={{gridRow: 2}}
                variant="h4" component="div">
                {t("education")}
            </Typography>
            
            {school.length === 0 && otherEduc.length === 0 && (
                <SectionHeader text={t("noEducation")} sx={{gridRow: 3}} />
            )}

            {school.length > 0 && (
                <SectionStack 
                    sx={{gridRow: 3}}
                    title={t("school")}>
                    {[...school]
                        .sort((a,b) => {
                            if (a.startDate < b.startDate) return 1
                            return -1
                        }) 
                        .map(x => (
                        <SchoolItem key={x.id} item={x} />
                    ))}
                </SectionStack>
            )}

            {otherEduc && (otherEduc.length > 0) && (
                <SectionStack 
                    sx={{gridRow: 4}}
                    title={`${t("courses")} / ${t("certifications")} / ${t("other")}`}>
                    {[...otherEduc]
                        .sort((a,b) => {
                            if (!a.startDate) return 1
                            if (!b.startDate) return -1
                            if (a.startDate < b.startDate) return 1
                            return -1
                        })
                        .map(x => (
                        <ExperienceItem key={x.id} item={x} />
                    ))}
                </SectionStack>
            )}

            <ArrowNavigation sx={{gridRow: 5, gridColumn: 1, justifyContent: "center", mb: 5}}
                nextPage="experience" prevPage="home" />
        </Box>
    )
}