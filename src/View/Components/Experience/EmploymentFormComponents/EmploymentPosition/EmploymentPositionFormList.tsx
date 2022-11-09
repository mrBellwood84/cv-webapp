import { Add } from "@mui/icons-material";
import { Button, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, SxProps } from "@mui/material"
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { IExperience } from "../../../../../Core/Data/Experience/IExperience";
import { EmploymentPositionFormDialog } from "./EmploymentPositionFormDialog";
import { EmploymentExperienceListItem } from "./EmploymentPositionFormListItem";

interface IProps {
    items: IExperience[];
    addItem: (item: IExperience) => void;
    updateItem: (item: IExperience) => void;
    removeItem: (item: IExperience) => void;
    sx?: SxProps;
    
}

export const EmploymentPositionFormList = ({items, addItem, updateItem, removeItem ,sx}: IProps) => {

    const { t } = useTranslation()

    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)

    return (
        <Fragment>

            <EmploymentPositionFormDialog
                handleData={addItem}
                isOpen={openAddDialog} 
                handleClose={() => setOpenAddDialog(false)} />

            <Stack 
                divider={<Divider flexItem orientation="horizontal" />} 
                sx={{
                    mt: 2,
                    border: "1px solid lightgray",
                    ...sx,
            }} >
                {items
                    .sort((a,b) => {
                        if (!a.startDate || !b.startDate) return 1;
                        if (a.startDate < b.startDate) return 1;
                        return -1;
                    })
                    .map(x => (
                    <EmploymentExperienceListItem 
                        key={x.id} 
                        item={x} 
                        editItem={updateItem} 
                        removeItem={removeItem} />
                ))}
                <Button fullWidth startIcon={<Add />} onClick={() => setOpenAddDialog(true)}>
                    {t("addPosition")}
                </Button>
            </Stack>

        </Fragment>
    )
}