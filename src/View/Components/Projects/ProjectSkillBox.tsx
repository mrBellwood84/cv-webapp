import { AddCircle } from "@mui/icons-material"
import { Box, Divider, IconButton, SxProps, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ISkillShort } from "../../../Core/Data/Skills/ISkillShort"
import { useAppSelector } from "../../../Core/Store/hooks"
import { ProjectSkillSelectDialog } from "./ProjectSkillSelectDialog"

type SkillType = "language" | "framework"

interface ISkillItemProps {
    item: ISkillShort
    skillArray: ISkillShort[];
    removeSkill: (array: ISkillShort[], item: ISkillShort) => void,
}

interface IProps {
    title: SkillType,
    skillArray: ISkillShort[],
    addSkill: (array: ISkillShort[], item: ISkillShort) => void,
    removeSkill: (array: ISkillShort[], item: ISkillShort) => void,
    sx?: SxProps
}


const SkillItem = ({ item, skillArray, removeSkill }: ISkillItemProps) => {

    const { t } = useTranslation()
    const handleRemove = (item: ISkillShort) => removeSkill(skillArray, item)

    return (
        <Box sx={{p: 0.5}} >
            <Tooltip title={`${t("remove")} ${item.name}`}>
                <IconButton onClick={() => handleRemove(item)}>
                    <img src={item.svgUrl} alt={`${item.name} logo`} height="30" />
                </IconButton>
            </Tooltip>
        </Box>
    )
}


export const ProjectSkillBox = ({title, skillArray, addSkill, removeSkill, sx}: IProps) => {

    const { t } = useTranslation()

    const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false)

    const allSkills = useAppSelector((state) => state.skills.skills);
    const selectedSkills = skillArray ? skillArray : [];

    return (
        <Box sx={{
            border: "1px dashed lightgray",
            width: "100%",
            display:"grid",
            gridTemplateRows: "max-content max-content",
            p: 1,
            ...sx
        }} >

            <ProjectSkillSelectDialog 
                allSkills={allSkills.filter(x => x.type === title)}
                selectedSkills={selectedSkills}
                addSkill={addSkill}
                title={title === "language" ? t("addLanguage") : t("addFramework")}
                isOpen={addDialogOpen} 
                handleClose={() => setAddDialogOpen(false)} />

            <Typography variant="caption" component="div" color="GrayText" sx={{gridRow: 1}}>
                {t(title)}
            </Typography>
            <Box sx={{
                gridRow: 2,
                display: "flex",
                alignItems: "center"
            }}>
                <Tooltip title={title === "language" ? t("addLanguage") : t("addFramework")}>
                    <IconButton onClick={() => setAddDialogOpen(true)}>
                        <AddCircle color="primary" />
                    </IconButton>
                </Tooltip>
                
                <Divider orientation="vertical" sx={{m: "0 5px"}} />

                {selectedSkills.map(x => (
                    <SkillItem key={x.id} item={x} skillArray={skillArray} removeSkill={removeSkill} />
                ))}
                
            </Box>
        </Box>
    )
}