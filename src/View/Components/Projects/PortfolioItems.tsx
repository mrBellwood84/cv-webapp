import { Box, Link, Stack, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IProject } from "../../../Core/Data/Portfolio/IProject"
import { useAppSelector } from "../../../Core/Store/hooks";

interface IProps {
    item: IProject;
}

export const PortfolioItem = ({item}: IProps) => {

    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.utils.language);

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{display: "flex", flexDirection:"row", alignItems: "center"}}>
                <Typography variant="h6" component="div">
                    {item.name}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ml: "auto"}}>
                    {item.languages && (item.languages.length > 0) && item.languages.map(x =>
                        <Tooltip title={x.name}>
                            <img src={x.svgUrl} height="30px" alt={`logo ${x.name}`} />
                        </Tooltip>
                    )}
                    {item.frameworks && (item.frameworks.length > 0) && item.frameworks.map(x => 
                        <Tooltip title={x.name}>
                            <img src={x.svgUrl} height="30px" alt={`logo ${x.name}`} />
                        </Tooltip>
                    )}
                </Stack>


            </Box>

            <Typography variant="body1" component="div" sx={{mb: 1, mt: 1}}>
                {item.text.find(x => x.code === lang)?.content}
            </Typography>
            
            {item.linkWebsiteUrl && (
                <Link href={item.linkWebsiteUrl} underline="hover" target="_blank" rel="noreferrer">
                    {t("webpage")}
                </Link>
            )}

            {item.linkRepoUrl && (
                <Link href={item.linkWebsiteUrl} underline="hover" target="_blank" rel="noreferrer">
                    GitHub
                </Link>
            )}



        </Box>
    )
}