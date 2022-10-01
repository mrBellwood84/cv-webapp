import { Box, SxProps, Theme } from "@mui/material"
import { useAppSelector } from "../../../Core/Store/hooks"
import { EducationContainer } from "../Education/EducationContainer"
import { HomeContainer } from "../Home/HomeContainer"
import { ProjectContainer } from "../Projects/ProjectsContainer"
import { SkillsContainer } from "../Skills/SkillsContainer"
import { ExperienceContainer } from "../Experience/ExperienceContainer"
import { ManageUsersContainer } from "../Admin/ManageUsersContainer"
import { EditUserContainer } from "../Admin/EditUserContainer"
import { AddEducationContainer } from "../Education/AddEducationContainer"
import { AddEditSchoolForm } from "../Education/AddEditSchoolForm"
import { AddEditExperienceForm } from "../Experience/AddEditExperienceForm"

interface IProps {
    sx: SxProps<Theme>
}

export const ContentContainer = ({sx}: IProps) => {

    const activeView = useAppSelector((state) => state.utils.activeView)
    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin";

    switch(activeView) {
        case "education":
            return (
                <Box sx={{...sx}}>
                    <EducationContainer />
                </Box>
            )

        case "addEducation":
            return <Box sx={{...sx}}>
                {isAdmin ? <AddEducationContainer/> : <HomeContainer />}
            </Box>

        case "editSchool":
            return <Box sx={{...sx}}>
                {isAdmin ? <AddEditSchoolForm /> : <HomeContainer />}
            </Box>

        case "editExperience":
            return <Box sx={{...sx}}>
                {isAdmin ? <AddEditExperienceForm datatype="none"  /> : <HomeContainer />}
            </Box>
            
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
        case "manageUsers":
            return (
                <Box sx={{...sx}}>
                    {isAdmin ? <ManageUsersContainer /> : <HomeContainer />}
                </Box>
            )

        case "editUser":
            return (
                <Box sx={{...sx}}>
                    {isAdmin ? <EditUserContainer /> : <HomeContainer />}
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