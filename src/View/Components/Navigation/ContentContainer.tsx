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
import { Fragment } from "react"
import { CreateEditUserForm } from "../Admin/CreateEditUserForm"

interface IProps {
    sx: SxProps;
}

export const ContentContainer = ({sx}: IProps) => {

    const activeView = useAppSelector((state) => state.utils.activeView)
    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin";

    switch(activeView) {
        case "education":
            return (
                <Fragment>
                    <EducationContainer sx={{...sx}} />
                </Fragment>
            )

        case "addEducation":
            return (
                <Fragment>
                    {isAdmin ? <AddEducationContainer sx={{...sx}} /> : <HomeContainer sx={{...sx}} />}
                </Fragment>
            )

        case "editSchool":
            return <Fragment>
                {isAdmin ? <AddEditSchoolForm sx={{...sx}} /> : <HomeContainer sx={{...sx}} />}
            </Fragment>

        case "editExperience":
            return <Fragment>
                {isAdmin ? <AddEditExperienceForm datatype="none" sx={{...sx}}  /> : <HomeContainer sx={{...sx}} />}
            </Fragment>
            
        case "experience":
            return (
                <Fragment>
                    <ExperienceContainer />
                </Fragment>
            )
        case "skills":
            return (
                <Fragment>
                    <SkillsContainer />
                </Fragment>
            )
        case "portfolio":
            return (
                <Fragment>
                    <ProjectContainer />
                </Fragment>
            )
        case "manageUsers":
            return (
                <Fragment>
                    {isAdmin ? <ManageUsersContainer sx={{...sx}} /> : <HomeContainer sx={{...sx}} />}
                </Fragment>
            )

        case "editUser":
            return (
                <Fragment>
                    {isAdmin ? <CreateEditUserForm sx={{...sx}} /> : <HomeContainer sx={{...sx}} />}
                </Fragment>
            )

        default:
            return (
                <Fragment>
                    <HomeContainer sx={{...sx}} />
                </Fragment>
                )


    }
}