import { IExperience } from "../../../Core/Data/Experience/IExperience";
import { findContentByLanguage, findIdByLanguage } from "../../../Core/Utils/languageTools";
import { v4 as guid } from "uuid"
import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingBox } from "../Misc/LoadingBox";
import { DeleteDialog } from "../Admin/DeleteDialog";
import { Box, Button, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { FormLanguageToggle } from "../_Shared/FormLanguageToggle";
import { experienceAgent } from "../../../Core/ApiAgent/experienceAgent";
import { Delete } from "@mui/icons-material";
import { educationStore } from "../../../Core/Store/Stores/educationStore";
import { utilStore } from "../../../Core/Store/Stores/utils";


type ExperienceFormData = {
    id: string;
    startDate?: string;
    endDate?: string;
    header_EN: string;
    header_NO: string;
    subheader_EN: string;
    subheader_NO: string;
    text_EN: string;
    text_NO: string;
}

const mapToFormData = (data: IExperience): ExperienceFormData => {
    return {
        id: data.id,
        startDate: data.startDate,
        endDate: data.endDate,
        header_EN: findContentByLanguage(data.header, "en"),
        header_NO: findContentByLanguage(data.header, "no"),
        subheader_EN: findContentByLanguage(data.subheader, "en"),
        subheader_NO: findContentByLanguage(data.subheader, "no"),
        text_EN: findContentByLanguage(data.text, "en"),
        text_NO: findContentByLanguage(data.text, "no"),
    }
}

const mapToDbData = (dataType: Experience, formData: ExperienceFormData, original?: IExperience ): IExperience => {

    let data: IExperience = {
        id: original ? original.id : guid(),
        type: dataType,
        startDate: formData.startDate ? formData.startDate : undefined,
        endDate: formData.endDate ? formData.endDate : undefined,
        header: [
            {
                id: original ? findIdByLanguage(original.header, "en") : guid(),
                code: "en",
                content: formData.header_EN,
            },
            {
                id: original ? findIdByLanguage(original.header, "no") : guid(),
                code: "no",
                content: formData.header_NO
            }
        ]
    }


    if (formData.subheader_EN && formData.subheader_NO) {
        data.subheader = [
            {
                id: original?.subheader ? findIdByLanguage(original.subheader, "en") : guid(),
                code: "en",
                content: formData.subheader_EN
            },
            {
                id: original?.subheader ? findIdByLanguage(original.subheader, "no") : guid(),
                code: "no",
                content: formData.subheader_NO,
            }
        ]
    }

    if (formData.text_EN && formData.text_NO) {
        data.text = [
            {
                id: original?.text ? findIdByLanguage(original.text, "en") : guid(),
                code: "en",
                content: formData.text_EN
            },
            {
                id: original?.text ? findIdByLanguage(original.text, "no") : guid(),
                code: "no",
                content: formData.text_NO
            }
        ]
    }

    return data;
}

type Experience = "expEduc" | "expOther" | "none"

interface IProps {
    datatype: Experience
}


export const AddEditExperienceForm = ({datatype}: IProps) => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const lang = useAppSelector((state) => state.utils.language)

    const [registerError, setRegisterError] = useState<string | undefined>(undefined)
    const [apiLoading, setApiLoading] = useState<boolean>(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [languageSelect, setLanguageSelect] = useState<string>(lang)

    const expEduc = useAppSelector((state) => state.education.selectedOtherEduc)
    const expOther = undefined; // not implemented...

    if (Boolean(expEduc) && Boolean(expOther)) {
        console.error("DEV :: Both experience types for this form exist in app state!!!")
    }

    if ((Boolean(expEduc) || Boolean(expOther)) || datatype === "none") {
        datatype = expEduc ? "expEduc" : "expOther";
    }

    const selected = datatype === "expEduc" ? expEduc : expOther;

    const edit = Boolean(selected);

    const { 
        register,
        handleSubmit,
        watch,
        setError, 
        formState: { errors }
    } = useForm<ExperienceFormData>({
        defaultValues: edit ? mapToFormData(selected!) : undefined,
    })

    const resolveHeaderHelperText = (lang: string): string => {
        let text;

        if (lang === "no") {
            if (errors.header_NO?.type === "required") return "titleRequired";
            if (errors.header_EN?.type === "required") return "englishTextMissing";
            text = watch("header_EN");
        }

        if (lang === "en") {
            if (errors.header_EN?.type === "required") return "titleRequired";
            if (errors.header_NO?.type === "required") return "norwegianTextRequired";
            text = watch("header_NO")
        }

        return text ? text : "";
    }

    const resolveSubHeaderHelperText = (lang: string): string => {
        
        const txt_no = watch("subheader_NO");
        const txt_en = watch("subheader_EN");

        const raiseError = Boolean(txt_no) !== Boolean(txt_en)

        if (lang === "no"){
            if (raiseError) {
                if (!Boolean(txt_en)) return t("englishTextMissing")
            }
            return txt_en ? txt_en : "";
        }
        if (lang === "en") {
            if (raiseError) {
                if (!Boolean(txt_no)) return t("norwegianTextMissing")
            }
            return txt_no ? txt_no : "";
        }

        return "";
    }

    const resolveTextHelperText = (lang: string): string => {
        const txt_no = watch("text_NO")
        const txt_en = watch("text_EN");

        const raiseError = Boolean(txt_no) !== Boolean(txt_en)

        if (lang === "no"){
            if (raiseError) {
                if (!Boolean(txt_en)) return t("englishTextMissing")
            }
            return txt_en
        }
        if (lang === "en") {
            if (raiseError) {
                if (!Boolean(txt_no)) return t("norwegianTextMissing")
            }
            return txt_no;
        }

        return ""
    }

    const resolveLanguageError = (data: ExperienceFormData) => {
        const bothTitle = Boolean(data.header_NO) && Boolean(data.header_EN)
        const bothSubtitle = Boolean(data.subheader_NO) === Boolean(data.subheader_EN)
        const bothText = Boolean(data.text_NO) === Boolean(data.subheader_EN)

        console.log(bothTitle, bothSubtitle, bothText)

        if (bothTitle && bothSubtitle && bothText) return false;

        if (!bothTitle) {
            if (!data.header_NO) setError("header_NO", { type: "required" })
            if (!data.header_EN) setError("header_EN", { type: "required" })
        }

        if (!bothSubtitle) {
            if (!data.subheader_EN) setError("subheader_EN", {type: "required"})
            if (!data.subheader_NO) setError("subheader_NO", {type: "required"})
        }

        if (!bothText) {
            if (!data.text_EN) setError("text_EN", { type: "required"})
            if (!data.text_NO) setError("text_NO", { type: "required"})
        }

        setRegisterError("translationMissing");
        return true;
    }

    const submit: SubmitHandler<ExperienceFormData> = async(data) => {

        setRegisterError(undefined)

        if (resolveLanguageError(data)) return

        setApiLoading(true)

        const dto = mapToDbData(datatype, data, selected)

        edit ? await updateExperience(dto) : await createExperience(dto)

        setApiLoading(false)
    }


    const createExperience = async (data: IExperience) => {
        console.log(data)
        const result = await experienceAgent.postExperience(data);
        if (typeof(result) === "number") {
            console.error(result, "DEV :: something went wrong")
            return
        }
        if (datatype === "expEduc") {
            dispatch(educationStore.actions.addOther(result))
            dispatch(utilStore.actions.setActiveView("education"))
        }

        if (datatype === "expOther") {
            throw new Error("Createing other experience not implemented")
        }
    }

    const updateExperience =async (data: IExperience) => {
        const result = await experienceAgent.updateExperience(data);
        if (typeof(result) === "number") {
            console.error(result, "DEV :: Something went wrong")
            return
        }

        if (datatype === "expEduc") {
            dispatch(educationStore.actions.updateOther(result))
            dispatch(utilStore.actions.setActiveView("education"))
        }

        if (datatype === "expOther") {
            throw new Error("Updating other experiences not implemented")
        }
    }

    const deleteExperience = async () => {
        const id = selected ? selected.id : "";

        const result = await experienceAgent.deleteExperience(id);

        if (result !== 200) {
            console.error(result, "DEV :: Could not delete item")
            return
        }

        if (datatype === "expEduc") {
            dispatch(educationStore.actions.removeOther(id));
            dispatch(utilStore.actions.setActiveView("education"))
        }

        if (datatype === "expOther") {
            throw new Error("Deleting other experience item not implemented")
        }
 
    }

    if (apiLoading) return <LoadingBox />

    return (
        <Fragment>
            <DeleteDialog 
                isOpen={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
                contentText={`${t("deleteText")} ${findContentByLanguage(selected?.header, languageSelect)}`}
                handleDelete={deleteExperience}
            />

            <Box sx={{width: "100%", display: "flex"}}>
                <FormLanguageToggle 
                    sx={{mt: 1}}
                    language={languageSelect}
                    setLanguage={setLanguageSelect}
                />

                {edit && (
                    <Tooltip title={t("delete")} sx={{ml: "auto"}}>
                        <IconButton onClick={() => setDeleteDialogOpen(true)}>
                            <Delete color="error" />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>


            <Box
                sx={{
                    m: 2,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "repeat(6, max-frame)",
                    gridGap: "10px"
                }}
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(submit)}
            >

                {languageSelect === "no" && (
                    <TextField
                        sx={{gridRow: 1, gridColumn: "1 / 3"}}
                        id="header_NO"
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth


                        label={t("title")}
                        {...register("header_NO", {required: "titleRequired"})}
                        error={(errors.header_NO !== undefined) || (errors.header_EN !== undefined)}
                        helperText={t(`${resolveHeaderHelperText("no")}`)}
                    />
                )}

                {languageSelect === "en" && (
                    <TextField
                        sx={{gridRow: 1, gridColumn: "1 / 3"}}
                        id="header_EN"
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth


                        label={t("title")}
                        {...register("header_EN", {required: "titleRequired"})}
                        error={(errors.header_NO !== undefined) || (errors.header_EN !== undefined)}
                        helperText={t(`${resolveHeaderHelperText("en")}`)}
                    />
                )}

                {languageSelect === "no" && (
                    <TextField 
                        sx={{gridRow: 2, gridColumn: "1 / 3"}}
                        id="subtitle_NO"
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth

                        label={t("subtitle")}
                        {...register("subheader_NO")}
                        error={(errors.subheader_NO !== undefined) || (errors.subheader_NO !== undefined)}
                        helperText={t(`${resolveSubHeaderHelperText("no")}`)}
                    />
                )}

                {languageSelect === "en" && (
                    <TextField 
                        sx={{gridRow: 2, gridColumn: "1 / 3"}}
                        id="subtitle_EN"
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth

                        label={t("subtitle")}
                        {...register("subheader_EN")}
                        error={(errors.subheader_NO !== undefined) || (errors.subheader_NO !== undefined)}
                        helperText={t(`${resolveSubHeaderHelperText("en")}`)}
                    />
                )}

                <TextField 
                    sx={{gridRow: 3, gridColumn: 1}}
                    id="start-date"
                    variant="standard"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}

                    label={t("startDate")}
                    {...register("startDate")}
                />
                <TextField 
                    sx={{gridRow: 3, gridColumn: 2}}
                    id="emd-date"
                    variant="standard"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}

                    label={t("end")}
                    {...register("endDate")}
                />

                {languageSelect === "no" && (
                    <TextField
                        sx={{gridRow: 4, gridColumn: "1 / 3"}}
                        id="textfield_NO"
                        variant="standard"
                        multiline
                        maxRows={5}

                        label={t("text")}
                        {...register("text_NO")}
                        helperText={resolveTextHelperText("no")} />
                )}

                {languageSelect === "en" && (
                    <TextField
                        sx={{gridRow: 4, gridColumn: "1 / 3"}}
                        id="textfield_EN"
                        variant="standard"
                        multiline
                        maxRows={5}

                        label={t("text")}
                        {...register("text_EN")}
                        helperText={resolveTextHelperText("en")} />
                )}

                {registerError && (
                    <Typography
                        sx={{gridRow: 5, gridColumn: "1 / 3"}}
                        variant="caption"
                        align="center"
                    >
                        {t(registerError)}
                    </Typography>
                )}

                <Button
                    sx={{ gridRow: 6, gridColumn: "1 / 3"}}
                    variant="contained"
                    color="success"
                    type="submit"
                >
                    {edit ? t("update") : t("create")}
                </Button>


            </Box>

            
        </Fragment>
    )
}