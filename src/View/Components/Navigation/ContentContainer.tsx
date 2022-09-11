import { Box, SxProps, Theme } from "@mui/material"
import { useAppSelector } from "../../../Core/Store/hooks"
import { EducationContainer } from "../Education/EducationContainer"
import { HomeContainer } from "../Home/HomeContainer"
import { ProjectContainer } from "../Projects/ProjectsContainer"
import { SkillsContainer } from "../Skills/SkillsContainer"
import { ExperienceContainer } from "../Experience/ExperienceContainer"

interface IProps {
    sx: SxProps<Theme>
}

export const ContentContainer = ({sx}: IProps) => {

    const activeView = useAppSelector((state) => state.utils.activeView)

    switch(activeView) {
        case "education":
            return (
                <Box sx={{...sx}}>
                    <EducationContainer />
                </Box>
            )
        case "experience":
            return (
                <Box sx={{...sx}}>
                    <ExperienceContainer />
                </Box>
            )
        case "skills":
            return (
                <Box sx={{...sx}}>
                    <SkillsContainer />
                </Box>
            )
        case "projects":
            return (
                <Box sx={{...sx}}>
                    <ProjectContainer />
                </Box>
            )
        default:
            return (
                <Box sx={{...sx}}>
                    <HomeContainer />
                </Box>
            )
    }
}