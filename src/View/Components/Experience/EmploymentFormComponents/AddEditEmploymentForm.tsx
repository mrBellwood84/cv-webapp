import { Box, Button, IconButton, SxProps, TextField, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { IEmployment } from "../../../../Core/Data/Experience/IEmployment"
import { IExperience } from "../../../../Core/Data/Experience/IExperience"
import { IReference } from "../../../../Core/Data/Shared/IReference"
import { useAppDispatch, useAppSelector } from "../../../../Core/Store/hooks"
import { LoadingBox } from "../../Misc/LoadingBox"
import { v4 as guid } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form"
import { employmentAgent } from "../../../../Core/ApiAgent/employmentAgent"
import { employmentStore } from "../../../../Core/Store/Stores/employmentStore"
import { utilStore } from "../../../../Core/Store/Stores/utilsStore"
import { Delete, EmojiPeopleOutlined } from "@mui/icons-material"
import { DeleteDialog } from "../../Admin/DeleteDialog"
import { ArrowNavigation } from "../../Navigation/ArrowNavigation"
import { SectionHeader } from "../../_Shared/SectionHeader"
import { EmploymentPositionFormList } from "./EmploymentPosition/EmploymentPositionFormList"
import { EmploymentReferenceFormList } from "./EmploymentReference/EmploymentReferenceFormList"

type FormData = {
    employer: string;
    startDate: string;
    endDate?: string;
    positions: IExperience[];
    reference: IReference[];
}

const mapToFormData = (data: IEmployment): FormData => {
    return {
        employer: data.employer,
        startDate: data.startDate,
        endDate: data.endDate,
        positions: data.positions,
        reference: data.references,
    }
}

const mapToDbData = (data: FormData, original?: IEmployment): IEmployment => {
    return {
        id: original ? original.id : guid(),
        employer: data.employer,
        startDate: data.startDate,
        endDate: data.endDate ? data.endDate : undefined,
        positions: data.positions,
        references: data.reference,
    }
}

interface IProps {
    sx?: SxProps
}

export const AddEditEmploymentForm = ({sx}: IProps) => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [apiLoading, setApiLoading] = useState<boolean>(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    const selected = useAppSelector((state) => state.employment.selectedEmployment);

    const {
        register, handleSubmit, setValue, watch, formState: { errors }
    } = useForm<FormData>({
        defaultValues: selected ? mapToFormData(selected) : undefined,
    })

    const providePositionsArray = (): IExperience[] => {
        const arr = watch("positions")
        return Boolean(arr) ? arr : []
    }

    const handleAddPositionItem = (item: IExperience): void => {
        let array = providePositionsArray()
        array.push(item);
        setValue("positions", array);
    }

    const handleEditPositionItem = (item: IExperience): void => {
        const array = providePositionsArray();
        const updated = array.map(x => {
            if (x.id === item.id) return item
            return x
        })

        setValue("positions", updated);
    }

    const handleremovePositionItem = (item: IExperience): void => {
        const updated = watch("positions").filter(x => x.id !== item.id)
        setValue("positions", updated)
    }

    const provideReferenceArray = (): IReference[] => {
        const array = watch("reference");
        return array ? array : [];
    }

    const handleAddReferenceItem = (item: IReference): void => {
        let array = provideReferenceArray()
        array.push(item)
        setValue("reference", array)
    }

    const handleEditReferenceItem = (item: IReference): void => {
        const array = provideReferenceArray()
        const updated = array.map(x => {
            if (x.id === item.id) return item;
            return x;
        })

        setValue("reference", updated);
    }

    const handleRemoveReferenceItem = (item: IReference) => {
        const array = provideReferenceArray()
        const updated = array.filter(x => x.id !== item.id);

        setValue("reference", updated)
    }

    const submit: SubmitHandler<FormData> = async (data) => {
        setApiLoading(true)

        const dbData = mapToDbData(data, selected)
        
        if (!selected) await handleCreate(dbData)
        if (selected) await handleUpdate(dbData)

        setApiLoading(false)
    }

    const handleCreate = async (data: IEmployment) => {
        const response = await employmentAgent.postSingle(data)
        if (typeof response === "number") {
            console.error("DEV :: could not add new employment item to database", response)
            return
        }
        dispatch(employmentStore.actions.addEmployment(response))
        dispatch(utilStore.actions.setActiveView("experience"))
    }

    const handleUpdate = async (data: IEmployment) => {
        const response = await employmentAgent.updateSingle(data)
        if (typeof response === "number") {
            console.error("DEV :: could not update existing item to database", response)
            return
        }
        dispatch(employmentStore.actions.updateEmployment(response))
        dispatch(utilStore.actions.setActiveView("experience"))
    }

    const handleDelete = async () => {
        const id = selected ? selected.id : "";
        const response = await employmentAgent.deleteSingle(id);
        if (response !== 200) {
            console.error(response, "DEV :: could not delete employment item")
            return
        }
        dispatch(employmentStore.actions.removeEmployment(id));
        dispatch(utilStore.actions.setActiveView("experience"));
    }

    if (apiLoading) return <LoadingBox sx={{...sx}} />

    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(5, max-content)",
            gridGap: 4,
            ...sx,
        }}>
            {selected && (
                <DeleteDialog 
                    isOpen={deleteDialogOpen}
                    handleClose={() => setDeleteDialogOpen(false)}
                    contentText={`${t("deleteText")} ${selected.employer}`}
                    handleDelete={handleDelete} />
            )}

            {selected && (<ArrowNavigation prevPage="experience" sx={{gridRow: 1}} />)}

            <SectionHeader text={selected ? t("editEmployment") : t("createEmployment")} sx={{gridRow: 2}} />

            {selected && (
                <Box sx={{gridRow: 3, display: "flex", justifyContent: "right"}}>
                    <Tooltip title={t("deleteDialog")}>
                        <IconButton onClick={() => setDeleteDialogOpen(true)}>
                            <Delete color="error" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

            <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(submit)}
                sx={{
                    gridRow: 5,
                    m: 2,
                    display: "grid",
                    gridTemplateRows: "repeat(6, max-content)",
                    gridTemplateColumns: "auto auto",
                    gridGap: 4,
                }}>

                <TextField 
                    sx={{gridRow: 1, gridColumn: "1 / 3"}}
                    variant="standard"
                    type="text"
                    autoCorrect="off"
                    fullWidth
                    
                    label={t("employerName")}
                    {...register("employer", {required: "employerRequired"})}
                    error={errors.employer !== undefined}
                    helperText={errors.employer && t(errors.employer.message!)} />

                <TextField 
                    sx={{gridRow: 2, gridColumn: 1}}
                    type="date"
                    variant="standard"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}

                    label={t("startDate")}
                    {...register("startDate", {required: "startDateRequired"})}
                    error={errors.startDate !== undefined}
                    helperText={errors.startDate && t(errors.startDate.message!)} />

                <TextField
                    sx={{gridRow: 2, gridColumn: 2}}
                    type="date"
                    variant="standard"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}

                    label={t("ended")}
                    {...register("endDate")} />

                <EmploymentPositionFormList 
                    items={providePositionsArray()}
                    addItem={handleAddPositionItem}
                    updateItem={handleEditPositionItem}
                    removeItem={handleremovePositionItem}
                    sx={{gridRow: 3, gridColumn: "1 / 3"}} />

                <EmploymentReferenceFormList 
                    items={provideReferenceArray()}
                    addItem={handleAddReferenceItem}
                    editItem={handleEditReferenceItem}
                    removeItem={handleRemoveReferenceItem}
                    sx={{gridRow: 4, gridColumn: "1 / 3"}} />


                <Button
                    sx={{gridRow: 6, gridColumn: "1 / 3"}}
                    variant="contained"
                    color="success"
                    type="submit">
                    {selected ? t("update") : t("create")}
                </Button>


            </Box>

        </Box>
    )

}

