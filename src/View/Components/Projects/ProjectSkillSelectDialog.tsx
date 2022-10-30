import { Search } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, InputAdornment, List, ListItemButton, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { ISkill } from "../../../Core/Data/Skills/ISkill";
import { ISkillShort } from "../../../Core/Data/Skills/ISkillShort";
import { v4 as guid } from "uuid"


interface IListItemProps {
    item: ISkill,
    select: (item: ISkill) => void;
    selectedArray: ISkillShort[];
}

interface IProps {
    allSkills: ISkill[],
    selectedSkills: ISkillShort[],
    addSkill: (array: ISkillShort[], item: ISkillShort) => void,
    handleClose: () => void,
    isOpen: boolean;
    title: string;
}


const SkillListItem = ({item, select, selectedArray}: IListItemProps) => {

    const disabled = selectedArray.findIndex(x => x.name === item.name) !== -1

    return (
        <ListItemButton
            disabled={disabled}
            onClick={() => select(item)}
            sx={{display: "flex", alignItems: "center", p: 1}} >
            
                <img src={item.svgUrl} alt={`${item.name} logo`} height="30" />

            <Typography variant="h6" component="div" sx={{ml: 2}}>
                {item.name}
            </Typography>

        </ListItemButton>
    )
}

export const ProjectSkillSelectDialog = ({ handleClose, isOpen, title, allSkills, selectedSkills, addSkill }: IProps) => {

    const { t } = useTranslation()
    const [searhedList, setSearchedList] = useState(allSkills)

    const handleSearchLanguage = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toUpperCase()

        if (value === "") {
            setSearchedList(allSkills)
            return
        }

        const result = allSkills.filter(x => {
            if (x.name.toUpperCase().includes(value)) return x
        }) 
        
        setSearchedList(result)
    }

    const handleSelect = (item: ISkill) => {
        const shortSkill: ISkillShort = {
            id: guid(),
            name: item.name,
            svgUrl: item.svgUrl
        }
        addSkill(selectedSkills, shortSkill)
        handleClose()
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>
                {t(title)}
            </DialogTitle>
            <DialogContent sx={{
                display: "grid",
                gridTemplateRows: "max-content"
            }}>

                <TextField 
                    sx={{gridRow: 1}}
                    type="text"
                    variant="standard"
                    size="small"
                    margin="none"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder={t("search")}
                    onChange={handleSearchLanguage}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment> 
                        )
                    }}
                    />

                <List sx={{gridRow: 2}}>
                    {searhedList
                        .sort((a,b) => {
                            if (a.name < b.name) return -1
                            return 1
                        })
                        .map(x => (
                        <SkillListItem
                            key={x.id}
                            item={x}
                            select={() => handleSelect(x)}
                            selectedArray={selectedSkills} />
                    ))}
                </List>

            </DialogContent>
        </Dialog>
    )
}