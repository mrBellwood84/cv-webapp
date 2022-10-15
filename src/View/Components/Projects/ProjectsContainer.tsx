import { Add } from "@mui/icons-material"
import { Box, Button, SxProps, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { portfolioAgent } from "../../../Core/ApiAgent/portfolioAgent"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { portfolioStore } from "../../../Core/Store/Stores/portfolioStore"
import { utilStore } from "../../../Core/Store/Stores/utilsStore"
import { LoadingBox } from "../Misc/LoadingBox"
import { ArrowNavigation } from "../Navigation/ArrowNavigation"
import { SectionHeader } from "../_Shared/SectionHeader"
import { SectionStack } from "../_Shared/SectionStack"

interface IProps {
    sx?: SxProps;
}

export const ProjectContainer = ({ sx }: IProps) => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch()

    const [apiLoading, setApiLoading] = useState<boolean>(false)

    const project = useAppSelector((state) => state.portfolio.projects)
    const role = useAppSelector((state) => state.account.account?.role);

    const handleAddProject = () => {
        dispatch(portfolioStore.actions.clearSelected())
        dispatch(utilStore.actions.setActiveView("addEditProject"))
    }

    useEffect(() => {
        const loadProjectData = async () => {
            if (project.length > 0) return;
            try {
                const response = await portfolioAgent.getAll();
                if (typeof response === "number"){
                    console.error(response, "DEV :: could not fetch project data");
                    return;
                }
                dispatch((portfolioStore.actions.setProjects(response)))
            } catch {
                console.error(500, "DEV :: Something went wrong when fetching project data")
            }
        }

        const loadData = async () => {
            setApiLoading(true)
            await loadProjectData()
            setApiLoading(false)
        }

        loadData()

    },[dispatch, project.length])

    if (apiLoading) return <LoadingBox sx={{...sx}} />

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "auto",
            gridTemplateRows: "repeat(4, max-content)",
            gridGap: 5,
            ...sx,
        }} >
            
            {role && role === "admin" && (
                <Box sx={{
                    gridRow: 1,
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Button onClick={handleAddProject} startIcon={<Add />}>
                        {t("addProject")}
                    </Button>
                </Box>
            )}

            <Typography variant="h4" component="div" sx={{gridRow: 2}}>
                {t("portfolio")}
            </Typography>

            {project.length === 0 && (
                <SectionHeader sx={{gridRow: 3}} text={t("noProjects")} />
            )}

            {project.length > 0 && (
                <SectionStack title={t("framwwork")} sx={{gridRow: 3}}>
                    {[...project]
                    .map(item => (
                        <div>project</div>
                    ))}
                </SectionStack>
            )}

            <ArrowNavigation sx={{gridRow: 4, mb: 5}} prevPage="skills" />

        </Box>
    )
}