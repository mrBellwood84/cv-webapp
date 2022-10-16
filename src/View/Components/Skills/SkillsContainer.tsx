import { Add } from "@mui/icons-material"
import { Box, Button, Divider, SxProps, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { skillAgent } from "../../../Core/ApiAgent/skillAgent"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { skillStore } from "../../../Core/Store/Stores/skillsStore"
import { utilStore } from "../../../Core/Store/Stores/utilsStore"
import { LoadingBox } from "../Misc/LoadingBox"
import { ArrowNavigation } from "../Navigation/ArrowNavigation"
import { SectionHeader } from "../_Shared/SectionHeader"
import { SectionStack } from "../_Shared/SectionStack"
import { SkillRatingExplained } from "./SkillRatingExplained"

interface IProps {
    sx?: SxProps
}

export const SkillsContainer = ({sx}: IProps) => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [apiLoading, setApiLoading] = useState<boolean>(false);

    const skills = useAppSelector((state) => state.skills.skills);
    const role = useAppSelector((state) => state.account.account?.role);

    const languages = skills.filter(s => s.type === "language")
    const frameworks = skills.filter(s => s.type === "frameworks")

    const handleAddSkill = () => {
        dispatch(skillStore.actions.clearSelected())
        dispatch(utilStore.actions.setActiveView("addEditSkill"))
    }

    useEffect(() => {
        const loadSkillData = async () => {
            if (skills.length > 0) return;
            try {
                const response = await skillAgent.getAll()
                if (typeof response === "number") {
                    console.error(response, "could not fetch skills data")
                    return
                }
                dispatch(skillStore.actions.setSkills(response))
            } catch {
                console.error(500, "DEV :: Something went wrong when fetcing skill data")
            }
        }

        const loadData = async () => {
            setApiLoading(true);
            await loadSkillData()
            setApiLoading(false);
        }

        loadData()
        
    },[ dispatch, skills.length ])

    if (apiLoading) return <LoadingBox sx={{...sx}} />

    return (

        <Box sx={{
            display: "grid",
            gridTemplateColumns: "auto",
            gridTemplateRows: "repeat(6, max-content)",
            gridGap: 5,
            ...sx,
        }}>
            {role && role === "admin" && (
                <Box sx={{
                    gridRow: 1,
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Button onClick={handleAddSkill} startIcon={<Add />}>
                        {t("addSkill")}
                    </Button>
                </Box>
            )}

            <Typography variant="h4" component="div" sx={{gridRow: 2}}>
                {t("skills")}
            </Typography>

            {skills.length === 0 && (
                <SectionHeader sx={{gridRow: 3}} text={t("noSkills")} />
            )}

            {languages.length > 0 && (
                <SectionStack title={t("programmingLanguages")} sx={{gridRow: 3}}>
                    {[...languages]
                        .sort((a,b) => {
                            if (a.rating < b.rating) return 1;
                            return -1;
                        })
                        .map(i => (
                            <div>language</div>
                        ))}
                </SectionStack>
            )}

            {frameworks.length > 0 && (
                <SectionStack title={t("frameworks")} sx={{gridRow: 4}}>
                    {[...frameworks]
                        .sort((a,b) => {
                            if (a.rating < b.rating) return 1;
                            return -1;
                        })
                        .map(i => (
                            <div>frameworks</div>
                        ))}
                </SectionStack>
            )}

            <ArrowNavigation sx={{gridRow: 5, mb: 5}}
                nextPage="portfolio" prevPage="experience" />

            {skills.length > 0 && (
                <Box sx={{gridRow: 6}}>
                    <Divider sx={{mt: 2}} />
                    <SkillRatingExplained />
                </Box>
            )}


        </Box>
    )
}