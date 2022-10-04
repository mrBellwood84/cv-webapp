import { Box, Button, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { Fragment, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ISchool } from "../../../Core/Data/School/ISchool"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { findContentByLanguage, findIdByLanguage } from "../../../Core/Utils/languageTools"
import { DeleteDialog } from "../Admin/DeleteDialog"
import { LoadingBox } from "../Misc/LoadingBox"
import { FormLanguageToggle } from "../_Shared/FormLanguageToggle"
import { v4 as guid } from "uuid"
import { ITextLocale } from "../../../Core/Data/Shared/ITextLocale"
import { educationStore } from "../../../Core/Store/Stores/educationStore"
import { utilStore } from "../../../Core/Store/Stores/utils"
import { Delete } from "@mui/icons-material"
import { schoolAgent } from "../../../Core/ApiAgent/schoolAgent"

type SchoolFormData = {
    id: string;
    schoolName_NO: string;
    schoolName_EN: string;
    course_NO: string;
    course_EN: string;
    start: string,
    end: string,
    text_NO: string;
    text_EN: string;
}


const mapToFormData = (data: ISchool): SchoolFormData => {
    return {
        id: data.id,
        schoolName_NO: findContentByLanguage(data.schoolName, "no"),
        schoolName_EN: findContentByLanguage(data.schoolName, "en" ),
        course_NO: findContentByLanguage(data.course, "no"),
        course_EN: findContentByLanguage(data.course, "en"),
        start: data.startDate.split("T")[0],
        end: data.endDate.split("T")[0],
        text_NO: findContentByLanguage(data.text, "no"),
        text_EN: findContentByLanguage(data.text, "en")
    }
}

const mapToDbData = (data: SchoolFormData, original?: ISchool): ISchool => {
    let schoolData: ISchool = {
        id: original ? original.id : guid(),
        schoolName: [
            {
                id: original ? findIdByLanguage(original.schoolName, "no") : guid(),
                code: "no",
                content: data.schoolName_NO
            },
            {
                id: original ? findIdByLanguage(original.schoolName, "en") : guid(),
                code: "en",
                content: data.schoolName_EN
            }
        ],
        course: [
            {
                id: original ? findIdByLanguage(original.course, "no") : guid(),
                code: "no",
                content: data.course_NO
            },
            {
                id: original ? findIdByLanguage(original.course, "en") : guid(),
                code: "en",
                content: data.course_EN
            }
        ],
        startDate: data.start,
        endDate: data.end,
        text: [
            {
                id: original ? findIdByLanguage(original.text, "no") : guid(),
                code: "no",
                content: data.text_NO
            },
            {
                id: original ? findIdByLanguage(original.text, "en") : guid(),
                code: "en",
                content: data.text_EN
            }
        ]
    }

    if (Boolean(data.text_NO) && Boolean(data.text_EN)) {

        let id_no = original ? findIdByLanguage(original.text, "no") : "";
        let id_en = original ? findIdByLanguage(original.text, "en") : "";
        id_no = Boolean(id_no) ? id_no : guid();
        id_en = Boolean(id_en) ? id_en : guid();

        let textArr: ITextLocale[] = [
            {
                id: id_no,
                code: "no",
                content: data.text_NO
            },
            {
                id: id_en,
                code: "en",
                content: data.text_EN,
            }
        ]

        schoolData.text = textArr;
    }

    return schoolData
}

export const AddEditSchoolForm = () => {

    const  { t } = useTranslation()
    const dispatch = useAppDispatch()

    const lang = useAppSelector((state) => state.utils.language)

    const [registerError, setRegisterError] = useState<string | undefined>(undefined)
    const [apiLoading, setApiLoading] = useState<boolean>(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [languageSelect, setLanguageSelect] = useState<string>(lang)

    const selected = useAppSelector((state) => state.education.selectedSchool)
    const edit = Boolean(selected)

    const { register, handleSubmit, watch, setError, formState: {errors} } = useForm<SchoolFormData>({
        defaultValues: edit ? mapToFormData(selected!) : undefined,
    })

    const resolveSchoolNameHelperText = (lang: string): string => {

        let text;

        if (lang === "no") {
            if (errors.schoolName_NO?.type === "required") return "schoolNameRequired"
            if (errors.schoolName_EN?.type === "required") return "englishTextMissing"
            text = watch("schoolName_EN")
        }
        if (lang === "en") {
            if (errors.schoolName_EN?.type === "required") return "schoolNameRequired"
            if (errors.schoolName_NO?.type === "required") return "norwegianTextMissing"
            text = watch("schoolName_NO")
        }

        return text ? text : ""
    }

    const resolveCourseHelperText = (lang: string): string => {
        let text;

        if (lang === "no") {
            if (errors.course_NO?.type === "required") return "courseRequired"
            if (errors.course_EN?.type === "required") return "englishTextMissing"
            text = watch("course_EN")
        }
        if (lang === "en") {
            if (errors.course_EN?.type === "required") return "courseRequired"
            if (errors.course_NO?.type === "required") return "norwegianTextRequired"
            text = watch("course_NO")
        }

        return text ? text: ""
    }

    const resolveTextField = (lang: string): string => {
        
        const txt_no = watch("text_NO")
        const txt_en = watch("text_EN")

        const raiseError = Boolean(txt_en) !== Boolean(txt_no)

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

    const resolveLanguageError = (data: SchoolFormData) => {

        let bothSchools = Boolean(data.schoolName_NO) && Boolean(data.schoolName_EN)
        let bothCourse = Boolean(data.course_NO) && Boolean(data.course_EN)
        let bothText = Boolean(data.text_EN) === Boolean(data.text_NO)

        if (bothSchools && bothCourse && bothText) return false

        if (!data.schoolName_EN) setError("schoolName_EN", {type: "required"})
        if (!data.schoolName_NO) setError("schoolName_NO", {type: "required"})
        if (!data.course_EN) setError("course_EN", {type: "required"})
        if (!data.course_NO) setError("course_NO", {type: "required"})

        if (!bothText) {
            if (!data.text_EN) setError("text_EN", { type: "required" })
            if (!data.text_NO) setError("text_NO", { type: "required" })
        }

        setRegisterError("translationMissing")

        return true
    }

    const submit: SubmitHandler<SchoolFormData> = async(data) => {
        setRegisterError(undefined)

        if (resolveLanguageError(data)) return

        setApiLoading(true)

        const dto = mapToDbData(data, selected)

        edit ? await updateSchool(dto) : await createSchool(dto)

        setApiLoading(false)

    }

    const createSchool = async (data: ISchool) => {
        var result = await schoolAgent.postSchool(data);
        if (typeof(result) === "number") {
            console.error("DEV :: something went wrong", result)
            return
        }
        dispatch(educationStore.actions.addSchool(result))
        dispatch(utilStore.actions.setActiveView("education"))
    }

    const updateSchool = async(data: ISchool) => {
        const result = await schoolAgent.updateSchool(data);
        if (typeof(result) === "number") {
            console.error(result, "DEV :: Updating school item failed")
            return
        }
        dispatch(educationStore.actions.updateSchool(result))
        dispatch(utilStore.actions.setActiveView("education"))
    }

    const deleteSchool = async () => {
        const id = selected ? selected.id : ""
        const result = await schoolAgent.deleteSchool(id)
        if (result !== 200) {
            console.error(result, "DEV :: Could not delete school item")
            return
        }
        dispatch(educationStore.actions.removeSchool(id));
        dispatch(utilStore.actions.setActiveView("education"))
    }

    if (apiLoading) return <LoadingBox />

    return (
        <Fragment>

            {selected && (
                <DeleteDialog  
                    isOpen={deleteDialogOpen}
                    handleClose={() => setDeleteDialogOpen(false)}
                    contentText={`${t("deleteText")} ${findContentByLanguage(selected.schoolName, languageSelect)}`}
                    handleDelete={deleteSchool}
                />
            )}

                <Box sx={{widht: "100%", display: "flex"}}>
                    <FormLanguageToggle 
                        sx={{ mt: 1}}
                        language={languageSelect}
                        setLanguage={setLanguageSelect} />
                    
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
                        display:"grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateRows: "repeat(6, max-content)",
                        gridGap: "10px",
                    }}
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSubmit(submit)}
                >

                    {languageSelect === "no" && (
                        <TextField 
                            sx={{gridRow: 1, gridColumn: "1 / 3"}}
                            id="schoolName_NO"
                            variant="standard"
                            type="text"
                            autoCorrect="off"
                            fullWidth

                            label={t("school")}
                            {...register("schoolName_NO", {required: "schoolNameRequired"})}
                            error={(errors.schoolName_NO !== undefined) || (errors.course_EN !== undefined)}
                            helperText={t(`${resolveSchoolNameHelperText("no")}`)}
                        />
                    )}

                    {languageSelect === "en" && (
                        <TextField 
                            sx={{gridRow: 1, gridColumn: "1 / 3"}}
                            id="schoolName_EN"
                            variant="standard"
                            type="text"
                            autoCorrect="off"
                            fullWidth

                            label={t("school")}
                            {...register("schoolName_EN", {required: "schoolNameRequired"})}
                            error={(errors.schoolName_NO !== undefined) || (errors.course_EN !== undefined)}
                            helperText={t(`${resolveSchoolNameHelperText("en")}`)}
                        />
                    )}

                    {languageSelect === "no" && (
                        <TextField 
                            sx={{gridRow: 2, gridColumn: "1 / 3"}}
                            id= "course_NO"
                            variant="standard"
                            type="text"
                            autoCorrect="off"
                            fullWidth

                            label={t("course")}
                            {...register("course_NO", {required: "courseRequired"})}
                            error={(errors.course_EN !== undefined) || (errors.course_NO === undefined)}
                            helperText={t((`${resolveCourseHelperText("no")}`))}
                        />
                    )}

                    {languageSelect === "en" && (
                        <TextField 
                            sx={{gridRow: 2, gridColumn: "1 / 3"}}
                            id= "course_EN"
                            variant="standard"
                            type="text"
                            autoCorrect="off"
                            fullWidth

                            label={t("course")}
                            {...register("course_EN")}
                            error={(errors.course_EN !== undefined) || (errors.course_NO === undefined)}
                            helperText={t((`${resolveCourseHelperText("en")}`))}
                        />
                    )}

                    <TextField 
                        sx={{gridRow: 3, gridColumn: 1}}
                        id="startDate"
                        variant="standard"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}

                        label={t("startDate")}
                        {...register("start", {required: "startDateRequired"})}
                        error={errors.start !== undefined}
                        helperText={errors.start && t(errors.start.message!)}
                    />

                    <TextField 
                        sx={{gridRow: 3, gridColumn: 2}}
                        id="endDate"
                        variant="standard"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}

                        label={t("end")}
                        {...register("end", {required: "endDateRequired"})}
                        error={errors.end !== undefined}
                        helperText={(errors.end && t(errors.end.message!))}
                    />

                    {languageSelect === "no" && (
                        <TextField 
                            sx={{gridRow: 4, gridColumn: "1 / 3"}}
                            id="textfield_NO"
                            variant="standard"
                            type="text"
                            multiline
                            maxRows={5}

                            label={t("text")}
                            {...register("text_NO")}
                            helperText={resolveTextField("no")}
                        />
                    )}

                    {languageSelect === "en" && (
                        <TextField 
                            sx={{gridRow: 4, gridColumn: "1 / 3"}}
                            id="textfield_EN"
                            variant="standard"
                            type="text"
                            multiline
                            maxRows={5}

                            label={t("text")}
                            {...register("text_EN")}
                            helperText={resolveTextField("en")}
                        />
                    )}

                    {registerError && (
                        <Typography
                            sx={{gridRow:5, gridColumn: "1 / 3", color: "darkred", fontWeight: 600}}
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