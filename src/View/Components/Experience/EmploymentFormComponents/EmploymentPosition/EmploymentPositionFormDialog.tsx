import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IExperience } from "../../../../../Core/Data/Experience/IExperience";
import { findContentByLanguage, findIdByLanguage } from "../../../../../Core/Utils/languageTools";
import { v4 as guid } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
    startDate?: string;
    endDate?: string;
    header_EN: string;
    header_NO: string;
    text_EN: string;
    text_NO: string;
}

const mapToFormData = (item: IExperience): FormData => {
    return {
        startDate: item.startDate,
        endDate: item.endDate,
        header_EN: findContentByLanguage(item.header, "en"),
        header_NO: findContentByLanguage(item.header, "no"),
        text_EN: findContentByLanguage(item.text, "en"),
        text_NO: findContentByLanguage(item.text, "no"),
    }
}

const mapToDbData = (data: FormData, original?: IExperience): IExperience => {
    return {
        id: original ? original.id : guid(),
        type: "position",
        startDate: data.startDate ? data.startDate : undefined,
        endDate: Boolean(data.endDate) ? data.endDate : undefined,
        header: [
            {
                id: original ? findIdByLanguage(original.header, "en") : guid(),
                code: "en",
                content: data.header_EN,
            },
            {
                id: original ? findIdByLanguage(original.header, "no")  : guid(),
                code: "no",
                content: data.header_NO,
            }
        ],
        subheader: [],
        text: [
            {
                id: original ? findIdByLanguage(original.text, "en") : guid(),
                code: "en",
                content: data.text_EN,
            },
            {
                id: original ? findIdByLanguage(original.text, "no") : guid(),
                code: "no",
                content: data.text_NO,
            }
        ]

    }
}

interface IProps {
    isOpen: boolean;
    handleClose: () => void;
    item?: IExperience;
    handleData: (item: IExperience) => void;
}

export const EmploymentPositionFormDialog = ({isOpen, handleClose, item, handleData}: IProps) => {

    const { t } = useTranslation()

    const {
        register, reset, handleSubmit, formState: { errors }
    } = useForm<FormData>({
        defaultValues: item ? mapToFormData(item) : undefined,
    })

    const closeDialog = (data?: IExperience) => {
        reset(data ? mapToFormData(data) : undefined)
        handleClose()
    }

    const submit: SubmitHandler<FormData> = data => {
        const dbData = mapToDbData(data, item)
        handleData(dbData)
        closeDialog(dbData)
    }

    return (
        <Dialog 
            fullWidth
            open={isOpen} 
            onClose={() => closeDialog()} >
            <DialogTitle>
                {item ? t("editPosition") : t("addPosition")}
            </DialogTitle>

            <DialogContent>

                <Box 
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSubmit(submit)}
                    sx={{
                       display: "grid",
                       gridTemplateRows: "repeat(5, max-content)",
                       gridTemplateColumns: "1fr 1fr",
                       gridGap: 5,
                    }}>
                    
                    <TextField
                        sx={{gridRow: 1, gridColumn: "1 / 3"}}
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth

                        label={t("titleNO")}
                        {...register("header_NO", {required: "titleMissing"})}
                        error={errors.header_NO !== undefined}
                        helperText={errors.header_NO && t(errors.header_NO.message!)} />

                    <TextField
                        sx={{gridRow: 2, gridColumn: "1 / 3"}}
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth

                        label={t("titleEN")}
                        {...register("header_EN", {required: "titleMissing"})}
                        error={errors.header_EN !== undefined}
                        helperText={errors.header_EN && t(errors.header_EN.message!)} />
                    
                    <TextField
                        sx={{gridRow: 3, gridColumn: 1}}
                        variant="standard"
                        type="date"
                        autoCorrect="off"
                        fullWidth

                        InputLabelProps={{
                            shrink: true
                        }}

                        label={t("startDate")}
                        {...register("startDate")} />
                    
                    <TextField
                        sx={{gridRow: 3, gridColumn: 2}}
                        variant="standard"
                        type="date"
                        autoCorrect="off"
                        fullWidth

                        InputLabelProps={{
                            shrink: true,
                        }}

                        label={t("ended")}
                        {...register("endDate")} />

                    <TextField
                        sx={{gridRow: 4, gridColumn: "1 / 3"}}
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth

                        multiline
                        maxRows={5}

                        label={t("positionDescriptionNO")}
                        {...register("text_NO")} />
                    
                    <TextField 
                        sx={{gridRow: 5, gridColumn: "1 / 3"}}
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth
                        
                        multiline
                        maxRows={5}

                        label={t("positionDescriptionEN")}
                        {...register("text_EN")} />
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