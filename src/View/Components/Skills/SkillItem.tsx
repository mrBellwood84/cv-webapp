import { Edit, School, SchoolOutlined } from "@mui/icons-material";
import { Box, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ISkill } from "../../../Core/Data/Skills/ISkill";
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks";
import { skillStore } from "../../../Core/Store/Stores/skillsStore";
import { utilStore } from "../../../Core/Store/Stores/utilsStore";

interface IProps {
    item: ISkill;
}

export const SkillItem = ({item,}: IProps) => {
    
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const lang = useAppSelector((state) => state.utils.language)
    const isAdmin = useAppSelector((state) => state.account.account?.role) === "admin";

    const handleEditSkill = () => {
        dispatch(skillStore.actions.setSelected(item))
        dispatch(utilStore.actions.setActiveView("addEditSkill"))
    }

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "max-content auto auto max-content",
            gridTemplateRows: "max-content max-content",
        }}>

            <Box sx={{ 
                gridRow: "1 / 3", gridColumn: 1,
                display: "flex", alignItems: "center",
                p: 2,
            }}>
                <img src={item.svgUrl} alt={`${item.name} logo`} height="40" />
            </Box>

            <Typography variant="h6" component="div" sx={{ gridRow: 1, gridColumn: 2}}>
                {item.name}
            </Typography>
            
            <Rating
                sx={{gridRow: 1, gridColumn: 3, ml: "auto", mr: 1}}
                value={item.rating}
                icon={<School sx={{color: "gray"}} /> }
                emptyIcon={<SchoolOutlined ></SchoolOutlined>}
                readOnly 
            />

            <Typography variant="body1" component="div" sx={{gridRow: 2, gridColumn: "2 / 4"}} >
                {item.text.find(x => x.code === lang)?.content}
            </Typography>

            {isAdmin && (
                <Box sx={{
                    gridRow: "1 / 3", gridColumn: 4, 
                    borderLeft: "1px solid lightgray",
                    alignSelf: "center"
                }}>
                    <Tooltip title={t("edit")} sx={{ml: 1, p: 1}}>
                        <IconButton onClick={handleEditSkill}>
                            <Edit color="primary" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

        </Box>

    )
}