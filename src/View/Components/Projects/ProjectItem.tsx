import { Edit } from "@mui/icons-material";
import { Box, Divider, IconButton, Link, ListItemSecondaryAction, Stack, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IProject } from "../../../Core/Data/Portfolio/IProject"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks";
import { portfolioStore } from "../../../Core/Store/Stores/portfolioStore";
import { utilStore } from "../../../Core/Store/Stores/utilsStore";

interface IProps {
    item: IProject;
}

export const ProjectItem = ({item}: IProps) => {

    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.utils.language);
    const dispatch = useAppDispatch()
    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin"

    const handleEditProject = () => {
        dispatch(portfolioStore.actions.setSelected(item));
        dispatch(utilStore.actions.setActiveView("addEditProject"))
    }

    return (

        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(4, max-content)",
            gridTemplateColumns: "auto max-content max-content",
            gridGap: 2,
        }}>

            <Typography variant="h6" component="div" sx={{
                gridRow: 1, gridColumn: 1
            }}>
                {item.projectName}
            </Typography>

            <Stack direction="row" spacing={1} sx={{gridRow: 1, gridColumn: 2, ml: "auto", mr: 1}} alignItems="center">
                {item.languages && item.languages.length > 0 && item.languages.map(item => (
                    <Tooltip key={item.id} title={item.name}>
                        <img src={item.svgUrl} height="22" alt={`${item.name} logo`} />
                    </Tooltip>
                ))}

                {(item.languages && item.languages.length > 0) 
                    && (item.frameworks && item.frameworks.length > 0) && (
                        <Divider orientation="vertical" />
                )}

                {item.frameworks && item.frameworks.length > 0 && item.frameworks.map(i => (
                    <Tooltip key={i.id} title={i.name}>
                        <img src={i.svgUrl} height="22" alt={`${i.name} logo`} />
                    </Tooltip>
                ))}
                
            </Stack>

            <Typography variant="body1" component="div" sx={{gridRow: 2, gridColumn: "1 / 3"}}>
                {item.text.find(x => x.code === lang)?.content}
            </Typography>

            {item.websiteUrl && (
                <Link 
                    sx={{gridRow: 3, gridColumn: "1 / 3" }}
                    href={item.websiteUrl} underline="hover" 
                    target="_blank" rel="noreferrer">
                    {t("webpage")}
                </Link>
            )}

            {item.repoUrl && (
                <Link
                    sx={{gridRow: 4, gridColumn: "1 / 3"}}
                    href={item.repoUrl} underline="hover"
                    target="_blank" rel="noreferrer">
                    GitHub
                </Link>
            )}

            {isAdmin && (
                <Box sx={{
                    gridRow: "1 / 3", gridColumn: 3,
                    borderLeft: "1px solid lightgray",
                    alignSelf: "center",
                }}>
                    <Tooltip title={t("edit")} sx={{ml: 1}}>
                        <IconButton onClick={handleEditProject}>
                            <Edit color="primary" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}


        </Box>
    )
}