import { Add } from "@mui/icons-material"
import { Box, Button, SxProps, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { employmentAgent } from "../../../Core/ApiAgent/employmentAgent"
import { experienceAgent } from "../../../Core/ApiAgent/experienceAgent"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { employmentStore } from "../../../Core/Store/Stores/employmentStore"
import { LoadingBox } from "../Misc/LoadingBox"
import { SectionHeader } from "../_Shared/SectionHeader"
import { SectionStack } from "../_Shared/SectionStack"
import { ExperienceItem } from "../Misc/ExperienceItem"
import { ArrowNavigation } from "../Navigation/ArrowNavigation"
import { utilStore } from "../../../Core/Store/Stores/utilsStore"


interface IProps {
    sx?: SxProps
}


export const ExperienceContainer = ({sx}: IProps) => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [apiLoading, setApiLoading] = useState<boolean>(false);

    const employment = useAppSelector((state) => state.employment.employments);
    const otherExperience = useAppSelector((state) => state.employment.otherExp);
    const role = useAppSelector((state) => state.account.account?.role);

    const handleAddEmployment = () => {
        dispatch(employmentStore.actions.clearSelected());
        dispatch(utilStore.actions.setActiveView("addExperience"))
    }

    useEffect(() => {

        const loadEmploymentData = async () => {
            if (employment.length > 0) return
            try {
                const response = await employmentAgent.getAll()
                if (typeof response === "number") {
                    console.error(response, "could not fetch employment data");
                    return
                }
                dispatch(employmentStore.actions.setEmployments(response))
            } catch {
                console.error(500, "Something went wrong when fetching employment data")
            }
        }

        const loadOtherExperience = async () => {
            if (otherExperience.length > 0) return
            try {
                const response = await experienceAgent.getOtherExperience()
                if (typeof response === "number") {
                    console.error(response, "could not fetch other experience from api")
                    return
                }
                dispatch(employmentStore.actions.setOtherExperience(response));
            } catch {
                console.error(500, "DEV :: Something went wrong with fetcing data from api")
            }
        }

        const loadData = async () => {
            setApiLoading(true)
            await loadEmploymentData()
            await loadOtherExperience()
            setApiLoading(false)
        }

        loadData()

    }, [dispatch, otherExperience.length, employment.length])


    if (apiLoading) {
        return <LoadingBox sx={{...sx }} />
    }

    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(5, max-content)",
            gridTemplateColumns: "auto",
            gridGap: 5,
            ...sx,
        }}>
            {role && role === "admin" && (
                <Box sx={{
                    gridRow: 1,
                    display: "flex",
                    alignItems: "center",
                }} >
                    <Button onClick={handleAddEmployment} startIcon={<Add />}>
                        {t("addExperience")}
                    </Button>
                </Box>
            )}

            <Typography variant="h4" component="div" sx={{gridRow: 2}}>
                {t("experience")}
            </Typography>

            {employment.length === 0 && otherExperience.length === 0 && (
                <SectionHeader text={t("noExperience")} sx={{gridRow: 3}} />
            )}

            {employment.length > 0 && (
                <SectionStack sx={{gridRow: 3}} title={t("employment")}>
                    {[...employment]
                        .map(item => (
                            <div key={item.id}>
                                {item.employer}
                            </div>
                        ))}
                </SectionStack>
            )}

            {otherExperience.length > 0 && (
                <SectionStack sx={{gridRow: 4}} title={t("otherExperience")}>
                    {[...otherExperience]
                        .map(item => (
                            <ExperienceItem key={item.id} item={item} />
                        ))}
                </SectionStack>
            )}

            <ArrowNavigation sx={{gridRow: 5, mb: 5}}
                nextPage="skills" prevPage="education" />

        </Box>
    )

} 