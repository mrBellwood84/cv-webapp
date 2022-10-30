import { Box, Button, IconButton, SxProps, TextField, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { IProject } from "../../../Core/Data/Portfolio/IProject"
import { ISkillShort } from "../../../Core/Data/Skills/ISkillShort"
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { findContentByLanguage, findIdByLanguage } from "../../../Core/Utils/languageTools"
import { v4 as guid } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form"
import { DeleteDialog } from "../Admin/DeleteDialog"
import { ArrowNavigation } from "../Navigation/ArrowNavigation"
import { SectionHeader } from "../_Shared/SectionHeader"
import { ProjectSkillBox } from "./ProjectSkillBox"
import { skillAgent } from "../../../Core/ApiAgent/skillAgent"
import { skillStore } from "../../../Core/Store/Stores/skillsStore"
import { LoadingBox } from "../Misc/LoadingBox"
import { portfolioAgent } from "../../../Core/ApiAgent/portfolioAgent"
import { portfolioStore } from "../../../Core/Store/Stores/portfolioStore"
import { utilStore } from "../../../Core/Store/Stores/utilsStore"
import { Delete } from "@mui/icons-material"

type FormData = {
    projectName: string;
    languages: ISkillShort[];
    frameworks: ISkillShort[];
    text_NO: string;
    text_EN: string;
    websiteUrl?: string;
    repoUrl?: string;
}

const mapToFormData = (data: IProject): FormData => {
    return {
        projectName: data.projectName,
        languages: data.languages,
        frameworks: data.frameworks,
        text_NO: findContentByLanguage(data.text, "no"),
        text_EN: findContentByLanguage(data.text, "en"),
        websiteUrl: data.websiteUrl,
        repoUrl: data.repoUrl,
    }
}

const mapToDbData = (data: FormData, original?: IProject): IProject => {
    return {
        id: original ? original.id : guid(),
        projectName: data.projectName,
        languages: data.languages ? data.languages : [],
        frameworks: data.frameworks ? data.frameworks : [],
        text: [
            {
                id: original ? findIdByLanguage(original.text, "en") : guid(),
                code: "en",
                content: data.text_EN 
            }, {
                id: original ? findIdByLanguage(original.text, "no") : guid(),
                code: "no",
                content: data.text_NO,
            }
        ],
        websiteUrl: data.websiteUrl ? data.websiteUrl : "",
        repoUrl: data.repoUrl ? data.repoUrl : "",
    }
}

interface IProps {
    sx?: SxProps
}

export const AddEditProjectForm = ({sx}: IProps) => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [apiLoading, setApiLoading] = useState<boolean>(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    const selected = useAppSelector((state) => state.portfolio.selectedProject);
    const skills = useAppSelector((state) => state.skills.skills).length;

    const {
        register, handleSubmit, setValue, watch, formState: { errors }
    } = useForm<FormData>({
        defaultValues: selected ? mapToFormData(selected) : undefined,
    })

    const provideLanguageArray = (): ISkillShort[] => {
        return watch("languages")
    }

    const addLanguageItem = (array: ISkillShort[], item: ISkillShort): void => {
        let updated = [...array];
        updated.push(item)
        setValue("languages", updated)
    }

    const removeLanguageItem = (array: ISkillShort[], item: ISkillShort): void => {
        let updated = [...array].filter(x => x.id !== item.id);
        setValue("languages", updated);
    }

    const provideFrameworkArray = (): ISkillShort[] => {
        return watch("frameworks")
    }

    const addFrameworkItem = (array: ISkillShort[], item: ISkillShort): void => {
        let updated = [...array]
        updated.push(item)
        setValue("frameworks", updated)
    }

    const removeFrameworkItem = (array: ISkillShort[], item: ISkillShort) => {
        let updated = [...array].filter(x => x.id !== item.id)
        setValue("frameworks", updated)
    }


    const submit: SubmitHandler<FormData> = async (data) => {

        setApiLoading(true)
        const dbData = mapToDbData(data, selected)

        if (!selected) await createProject(dbData);
        if (selected) await updateProject(dbData);

        setApiLoading(false)

    }

    const createProject = async (data: IProject) => {
        const response = await portfolioAgent.postSingle(data)
        if (typeof response === "number") {
            console.error("DEV :: Something went wrong when posting new project")
            return
        }
        dispatch(portfolioStore.actions.addProject(response))
        dispatch(utilStore.actions.setActiveView("portfolio"))
    }

    const updateProject = async (data: IProject) => {

        const response = await portfolioAgent.updateSingle(data)
        if (typeof response === "number") {
            console.error(response, "DEV :: could not update project")
            return
        }
        dispatch(portfolioStore.actions.updateProject(response))
        dispatch(utilStore.actions.setActiveView("portfolio"));
    }

    const deleteProject = async () => {
        const id = selected ? selected.id : "";
        const result = await portfolioAgent.deleteSingle(id);
        if (result !== 200) {
            console.error(result, "DEV :: could not delete project")
            return
        }
        dispatch(portfolioStore.actions.removeProject(id))
        dispatch(utilStore.actions.setActiveView("portfolio"))
    }

    useEffect(() => {
        const loadSkillData = async () => {
            if (skills > 0) return
            try {
                const response = await skillAgent.getAll();
                if (typeof response === "number") {
                    console.error(response, "could not fetch skill data")
                    return
                }
                dispatch(skillStore.actions.setSkills(response))
            } catch {
                console.error(500, "DEV :: Something went wrong when fetching skill data")
            }
        }

        const loadData = async () => {
            setApiLoading(true)
            await loadSkillData()
            setApiLoading(false)
        }

        loadData()
    },[dispatch, skills])

    if (apiLoading) return <LoadingBox sx={{...sx}} />


    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(5, max-content)",
            gridGap: "4",
            ...sx,
        }}>
            {selected && (
                <DeleteDialog 
                isOpen={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
                contentText={`${t("deleteText")} ${selected.projectName}`}
                handleDelete={deleteProject} />
            )}

            <ArrowNavigation prevPage="portfolio" sx={{gridRow: 1}} />
            <SectionHeader text={selected ? t("editProject") : t("createProject")} sx={{gridRow: 2}} />

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
                    gridTempateRows: "repeat(9, max-content)",
                    gridGap: 5,
                }}
            >
                <TextField 
                    sx={{gridRow: 1}}
                    variant="standard"
                    type="text"
                    autoCorrect="off"
                    fullWidth

                    label={t("name")}
                    {...register("projectName", {required: "nameRequired"})}
                    error={errors.projectName !== undefined}
                    helperText={errors.projectName && t(errors.projectName.message!)} />

                <TextField 
                    sx={{gridRow: 2}}
                    variant="standard"
                    type="text"
                    autoCorrect="off"
                    fullWidth
                    multiline
                    maxRows={5}

                    label={t("norwegianText")}
                    {...register("text_NO", {required: "norwegianTextMissing"})}
                    error={errors.text_NO !== undefined}
                    helperText={errors.text_NO && t(errors.text_NO.message!)} />

                <TextField 
                    sx={{gridRow: 3}}
                    variant="standard"
                    type="text"
                    autoCorrect="off"
                    fullWidth
                    multiline
                    maxRows={5}

                    label={t("englishText")}
                    {...register("text_EN", {required: "englishTextMissing"})}
                    error={errors.text_EN !== undefined}
                    helperText={errors.text_EN && t(errors.text_EN.message!)} />

                <TextField 
                    sx={{gridRow: 4}}
                    variant="standard"
                    type="text"
                    autoCorrect="off"
                    fullWidth

                    label={t("websiteUrl", {required: false})}
                    {...register("websiteUrl")} />

                <TextField 
                    sx={{gridRow: 5}}
                    variant="standard"
                    type="text"
                    autoCorrect="off"
                    fullWidth

                    label={t("repoUrl")}
                    {...register("repoUrl", {required: false})} />

                <ProjectSkillBox 
                    title="language"
                    skillArray={provideLanguageArray()}
                    addSkill={addLanguageItem}
                    removeSkill={removeLanguageItem}
                    sx={{gridRow: 6}} />

                <ProjectSkillBox
                    title="framework"
                    skillArray={provideFrameworkArray()}
                    addSkill={addFrameworkItem}
                    removeSkill={removeFrameworkItem}
                    sx={{gridRow: 7}} />

                <Button sx={{gridRow: 9}} variant="contained" color="success" type="submit">
                    {selected ? t("update") : t("create")}
                </Button>

            </Box>

        </Box>
    )
}