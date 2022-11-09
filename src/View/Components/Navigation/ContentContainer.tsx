import { SxProps } from "@mui/material"
import { useAppSelector } from "../../../Core/Store/hooks"
import { EducationContainer } from "../Education/EducationContainer"
import { HomeContainer } from "../Home/HomeContainer"
import { ProjectContainer } from "../Projects/ProjectsContainer"
import { SkillsContainer } from "../Skills/SkillsContainer"
import { ExperienceContainer } from "../Experience/ExperienceContainer"
import { ManageUsersContainer } from "../Admin/ManageUsersContainer"
import { AddEducationContainer } from "../Education/AddEducationContainer"
import { AddEditSchoolForm } from "../Education/AddEditSchoolForm"
import { AddEditExperienceForm } from "../Experience/AddEditExperienceForm"
import { CreateEditUserForm } from "../Admin/CreateEditUserForm"
import { AddEditEmploymentForm } from "../Experience/EmploymentFormComponents/AddEditEmploymentForm"
import { AddExperienceContainer } from "../Experience/AddExperienceContainer"
import { AddEditSkillForm } from "../Skills/AddEditSkillForm"
import { AddEditProjectForm } from "../Projects/AddEditProjectForm"

interface IProps {
    sx: SxProps;
}

export const ContentContainer = ({sx}: IProps) => {

    const activeView = useAppSelector((state) => state.utils.activeView)
    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin";

    switch(activeView) {

        case "education":
            return <EducationContainer sx={{...sx}} />

        case "experience":
            return <ExperienceContainer sx={{...sx}} />

        case "skills":
            return <SkillsContainer sx={{...sx}} />

        case "portfolio":
            return <ProjectContainer sx={{...sx}} />


        case "manageUsers": 
            return isAdmin ?
                <ManageUsersContainer sx={{...sx}} /> : 
                <HomeContainer sx={{...sx}} />
        
        case "editUser":
            return isAdmin ? 
                <CreateEditUserForm sx={{...sx}} /> :
                <HomeContainer sx={{...sx}} />


        case "addEducation":
            return isAdmin ? 
                <AddEducationContainer sx={{...sx}} /> :
                <HomeContainer sx={{...sx}} />
        
        case "editSchool": 
            return isAdmin ? 
                <AddEditSchoolForm sx={{...sx}} /> : 
                <HomeContainer sx={{...sx}} />

        case "editEducationExperience":
            return isAdmin ?
                <AddEditExperienceForm datatype="education" sx={{...sx}} /> : 
                <HomeContainer sx={{...sx}} />


        case "addExperience": 
            return isAdmin ? 
                <AddExperienceContainer sx={{...sx}} /> :
                <HomeContainer sx={{...sx}} />

        case "editEmployment":
            return isAdmin ? 
                <AddEditEmploymentForm sx={{...sx}} /> :
                <HomeContainer sx={{...sx}} />

        case "editOtherExperience":
            return isAdmin ? 
                <AddEditExperienceForm datatype="other" sx={{...sx}} /> :
                <HomeContainer sx={{...sx}} />

        case "addEditSkill":
            return isAdmin ? 
                <AddEditSkillForm sx={{...sx}} /> : 
                <HomeContainer sx={{...sx}} />

        case  "addEditProject": 
            return isAdmin ? 
                <AddEditProjectForm sx={{...sx}} /> :
                <HomeContainer sx={{...sx}} />

        default:
            return <HomeContainer sx={{...sx}} />
    }
}