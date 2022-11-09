import { IReference } from "../../../../../Core/Data/Shared/IReference";
import { findContentByLanguage, findIdByLanguage } from "../../../../../Core/Utils/languageTools";
import { v4 as guid } from "uuid";
import { DiagnosticCategory } from "typescript";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";


type FormData = {
    name: string;
    role_NO: string;
    role_EN: string;
    phonenumber?: string;
    email?: string;
}

const mapToFormData = (data: IReference): FormData => {
    return {
        name: data.name,
        role_NO: findContentByLanguage(data.role, "no"),
        role_EN: findContentByLanguage(data.role, "en"),
        phonenumber: data.phonenumber,
        email: data.email,
    }
}

const mapToDbData = (data: FormData, original?: IReference): IReference => {
    return {
        id: original ? original.id : guid(),
        name: data.name,
        role: [
            {
                id: original ? findIdByLanguage(original.role, "no") : guid(),
                code: "no",
                content: data.role_NO,
            },
            {
                id: original ? findIdByLanguage(original.role, "en") : guid(),
                code: "en",
                content: data.role_EN,
            }
        ],
        phonenumber: data.phonenumber,
        email: data.email,
    }
}

interface IProps {
    isOpen: boolean;
    handleClose: () => void;
    item?: IReference,
    handleData: (item: IReference) => void;
}

export const EmploymentReferenceFormDialog = ({ isOpen, handleClose, item, handleData }: IProps) => {

    const { t } = useTranslation()
    
    const {
        register, reset, handleSubmit, formState: { errors },
    } = useForm<FormData>({
        defaultValues: item ? mapToFormData(item) : undefined,
    });

    const closeDialog = (data?: IReference) => {
        reset(data ? mapToFormData(data) : undefined)
        handleClose()
    }

    const submit: SubmitHandler<FormData> = (data) => {
        const dbData = mapToDbData(data, item);
        handleData(dbData);
        closeDialog(dbData);
    }


    return (
        <Dialog
            fullWidth
            open={isOpen}
            onClose={() => closeDialog()}>

            <DialogTitle>
                {item ? t("editReference") : t("addReference")}
            </DialogTitle>

            <DialogContent>
                
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSubmit(submit)}
                    sx={{
                        display: "grid",
                        gridTemplateRows: "repeat(7, max-content)",
                        gridGap: 5,
                    }}>
                    
                    <TextField
                        sx={{ gridRow: 1}}
                        type="text"
                        variant="standard"
                        autoCorrect="off"
                        fullWidth

                        label={t("name")}
                        {...register("name", {required: "nameRequired"})}
                        error={errors.name !== undefined}
                        helperText={errors.name && t(errors.name.message!)} />
                    
                    <TextField
                        sx={{ gridRow: 2 }}
                        type="text"
                        variant="standard"
                        autoCorrect="off"
                        fullWidth

                        label={t("titleNO")}
                        {...register("role_NO", {required: "titleMissing"})}
                        error={errors.role_NO !== undefined}
                        helperText={errors.role_NO && t(errors.role_NO.message!)} />
                    
                    <TextField
                        sx={{gridRow: 3}}
                        type="text"
                        variant="standard"
                        autoCorrect="off"
                        fullWidth

                        label={t("titleEN")}
                        {...register("role_EN", {required: "titleMissing"})}
                        error={errors.role_EN !== undefined}
                        helperText={errors.role_EN && t(errors.role_EN.message!)} />

                    <TextField
                        sx={{gridRow: 4}}
                        type="text"
                        variant="standard"
                        autoCorrect="off"
                        fullWidth

                        label={t("phonenumber")}
                        {...register("phonenumber")} />
                    
                    <TextField
                        sx={{gridRow: 5}}
                        type="text"
                        variant="standard"
                        autoCorrect="off"
                        fullWidth

                        label={t("email")}
                        {...register("email")} />


                </Box>

            </DialogContent>

            <DialogActions>
                <Button onClick={() => closeDialog()}>
                    {t("cancel")}
                </Button>
                <Button onClick={handleSubmit(submit)}>
                    {item ? t("update") : t("create")}
                </Button>
            </DialogActions>

        </Dialog>

    )
}