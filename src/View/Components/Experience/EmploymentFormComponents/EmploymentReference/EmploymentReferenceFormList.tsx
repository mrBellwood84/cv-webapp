import { Add } from "@mui/icons-material";
import { Button, Divider, Stack, SxProps } from "@mui/material"
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { IReference } from "../../../../../Core/Data/Shared/IReference";
import { EmploymentReferenceFormDialog } from "./EmploymentReferenceFormDialog";
import { EmploymentReferenceFormListItem } from "./EmploymentReferenceFormListItem";

interface IProps {
    items: IReference[];
    addItem: (item: IReference) => void;
    editItem: (item: IReference) => void;
    removeItem: (item: IReference) => void;
    sx?: SxProps;
}

export const EmploymentReferenceFormList = ({items, addItem, editItem, removeItem, sx}: IProps) => {

    const { t } = useTranslation()
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)

    return (
        <Fragment>
            <EmploymentReferenceFormDialog
                handleData={addItem}
                isOpen={openAddDialog}
                handleClose={() => setOpenAddDialog(false)} />

            <Stack
                divider={<Divider flexItem orientation="horizontal" />}
                sx={{
                    mt: 2,
                    border: "1px solid lightgray",
                    ...sx,
                }}>
                
                {items.map(i => (
                    <EmploymentReferenceFormListItem 
                        key={i.id} 
                        item={i}
                        editItem={editItem}
                        removeItem={removeItem} />
                ))}

                <Button fullWidth startIcon={<Add />} onClick={() => setOpenAddDialog(true)}>
                    {t("addReference")}
                </Button>

            </Stack>


        </Fragment>
    )
}