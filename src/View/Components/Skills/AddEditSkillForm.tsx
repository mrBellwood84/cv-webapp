import { v4 as guid } from "uuid";
import { Box, Button, FormControlLabel, IconButton, Link, Radio, RadioGroup, Rating, SxProps, TextField, Tooltip, Typography } from "@mui/material";
import { ISkill } from "../../../Core/Data/Skills/ISkill";
import { findContentByLanguage, findIdByLanguage } from "../../../Core/Utils/languageTools";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks";
import { useEffect, useState } from "react";
import { LoadingBox } from "../Misc/LoadingBox";
import { SubmitHandler, useForm } from "react-hook-form";
import { DeleteDialog } from "../Admin/DeleteDialog";
import { ArrowNavigation } from "../Navigation/ArrowNavigation";
import { SectionHeader } from "../_Shared/SectionHeader";
import { Delete, School, SchoolOutlined } from "@mui/icons-material";
import { skillAgent } from "../../../Core/ApiAgent/skillAgent";
import { skillStore } from "../../../Core/Store/Stores/skillsStore";
import { utilStore } from "../../../Core/Store/Stores/utilsStore";

const ratingLabels: {[index: string]: string} = {
    1: "rate1",
    2: "rate2",
    3: "rate3",
    4: "rate4",
    5: "rate5",
};

const resolveRatingText = (value: number | null, hover: number) => {
    if (value === null) return ""
    return ratingLabels[hover !== -1 ? hover : value]
}

type SkillFormData = {
    id: string;
    type: string;
    name: string;
    svgUrl: string;
    rating: number;
    text_no: string;
    text_en: string;
}

const mapToFormData = (data: ISkill): SkillFormData  => {
    return {
        id: data.id,
        type: data.type,
        name: data.name,
        svgUrl: data.svgUrl,
        rating: data.rating,
        text_no: findContentByLanguage(data.text, "no"),
        text_en: findContentByLanguage(data.text, "en")
    }
}

const mapToDbData = (data: SkillFormData, original?: ISkill): ISkill => {
    return {
        id: original ? original.id : guid(),
        type: data.type,
        name: data.name,
        svgUrl: data.svgUrl,
        rating: data.rating ? data.rating : 0,
        text: [
            {
                id: original ? findIdByLanguage(original.text, "en") : guid(),
                code: "en",
                content: data.text_en,
            },
            {
                id: original ? findIdByLanguage(original.text, "no") : guid(),
                code: "no",
                content: data.text_no,
            }
        ]
    }
}

const resolveImageField = (resolveImageUrl: () => string | undefined, text: string) => {
    const url = resolveImageUrl();
    if (url) return <img src={url} alt={text} height="60" />
    return (
        <Box sx={{
            height: 58, width: 58,
            border: "1px dotted gray",
            display: "flex",
            justifyContent: "center", alignItems: "center"
        }}>
            <Typography component="legend" sx={{fontSize: "12px", textAlign: "center"}}>
                {text}
            </Typography>
        </Box>
    )
}


interface IProps {
    sx?: SxProps
}

export const AddEditSkillForm = ({sx}: IProps) => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [ratingValue, setRatingValue] = useState<number | null>(1);
    const [ratingHover, setRatingHover] = useState<number>(-1);
    const [skillType, setSkillType] = useState<string>("language");
    const [hooksUpdated, setHooksUpdated] = useState<boolean>(false);

    const selected = useAppSelector((state) => state.skills.selectedSkill);

    const {
        register, handleSubmit, setValue, watch, formState: { errors }
    } = useForm<SkillFormData>({
        defaultValues: selected ? mapToFormData(selected) : undefined,
    })

    const handleTypeRegister = (value: string) => {
        setSkillType(value)
        setValue("type", value)
    }

    const handleRatingRegister = (value: number | null) => {
        setRatingValue(value)        
        if (!value) value = 0;
        setValue("rating", value)
    }

    const resolveLogoUrl = ():string | undefined => {
        const url = watch("svgUrl")
        return url
        
    }

    const submit: SubmitHandler<SkillFormData> = async (data) => {

        setApiLoading(true)
        const remapped = mapToDbData(data, selected)
        if (!selected) await createSkill(remapped)
        if (selected) await updateSkill(remapped)

        setApiLoading(false)
    }

    const createSkill = async (data: ISkill) => {
        const response = await skillAgent.postSingle(data)
        if (typeof response === "number") {
            console.error("DEV :: something went wrong", response )
            return
        }
        console.log(response)
        dispatch(skillStore.actions.addSkill(response))
        dispatch(utilStore.actions.setActiveView("skills"))
    }

    const updateSkill = async (data: ISkill) => {
        const response = await skillAgent.updateSingle(data);
        if (typeof response === "number") {
            console.error("DEV :: could not update skill data", response)
            return
        }
        dispatch(skillStore.actions.updateSkill(response))
        dispatch(utilStore.actions.setActiveView("skills"))
    }

    const deleteSkill = async () => {
        const id = selected ? selected.id : ""
        const result = await skillAgent.deleteSingle(id)
        if (result !== 200) {
            console.error(result, "DEV :: could not delete skill item")
        }
        dispatch(skillStore.actions.removeSkills(id))
        dispatch(utilStore.actions.setActiveView("skills"))
    }

    useEffect(() => {
        const updateRegister = () => {
            if (selected) return;
            setValue("type", skillType);
            setValue("rating", ratingValue ? ratingValue : 1)
        }

        const updateHooks = () => {
            if (!selected) return;
            setSkillType(selected.type)
            setRatingValue(selected.rating)
        }

        const update = () => {
            if (hooksUpdated) return;
            updateRegister();
            updateHooks()
            setHooksUpdated(true)
        }

        update()

    }, [ratingValue, selected, setValue, skillType, hooksUpdated]);

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
                    contentText={`${t("deleteText")} ${selected.name}`}
                    handleDelete={deleteSkill} />
            )}

            <ArrowNavigation prevPage="skills" sx={{gridRow: 1}} />
            <SectionHeader text={ selected ? t("editSkill") : t("addSkill")} sx={{gridRow: 2}} />
            
            <Box 
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(submit)}
                sx={{
                    gridRow: 4,
                    m: 2,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "repeat(8, max-content)",
                    gridGap: 5
                }}>
                    <Box sx={{
                        gridRow: 1, gridColumn: "1 / 3",
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <RadioGroup row value={skillType} onChange={(event, value) => handleTypeRegister(value)}>
                            <FormControlLabel value="language" control={<Radio />} label={t("language")} labelPlacement="start" />
                            <FormControlLabel value="framework" control={<Radio />} label={t("framework")} labelPlacement="start" />
                        </RadioGroup>
                        <Tooltip title={t("deleteDialog")}>
                            <IconButton onClick={() => setDeleteDialogOpen(true)}>
                                <Delete color="error" />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <TextField 
                        sx={{gridRow: 2}}
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth

                        label={t("name")}
                        {...register("name", {required: "nameRequired"})}
                        error={errors.name !== undefined}
                        helperText={errors.name && t(errors.name.message!)} />

                    <Box sx={{gridRow: "1 / 3", gridColumn: 2, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {resolveImageField(resolveLogoUrl, t("noLogoFound"))}
                    </Box>

                    <TextField
                        sx={{gridRow: 3, gridColumn: "1 / 3"}}
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth
                        
                        label={t("svgUrl")}
                        {...register("svgUrl", {required: "svgUrlRequired"})}
                        error={errors.svgUrl !== undefined}
                        helperText={errors.svgUrl && t(errors.svgUrl.message!)} />

                    
                    <Box sx={{gridRow: 4, gridColumn: "1 / 3", mt:1, display: "flex"}}>
                        <Rating 
                            icon={<School sx={{color: "gray"}}/>}
                            emptyIcon={<SchoolOutlined />}
                            value={ratingValue}
                            onChange={(event, value) => handleRatingRegister(value)}
                            onChangeActive={(event, value) => setRatingHover(value)} 
                        />
                        <Typography component="legend" sx={{ml: 2}}>
                            {t(resolveRatingText(ratingValue, ratingHover))}
                        </Typography>
                    </Box>

                    <TextField
                        sx={{gridRow: 5, gridColumn: "1 / 3"}}
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth
                        multiline
                        maxRows={5}

                        label={t("norwegianText")}
                        {...register("text_no", {required: "norwegianTextMissing"})}
                        error={errors.text_no !== undefined}
                        helperText={ errors.text_no && t(errors.text_no.message!) }
                    
                    />
                    
                    <TextField
                        sx={{gridRow: 6, gridColumn: "1 / 3" }}
                        variant="standard"
                        type="text"
                        autoCorrect="off"
                        fullWidth
                        multiline
                        maxRows={5}

                        label={t("englishText")}
                        {...register("text_en", {required: "englishTextMissing"})}
                        error={errors.text_en !== undefined}
                        helperText={ errors.text_en && t(errors.text_en.message!) }
                    
                    />

                    <Button sx={{gridRow: 8, gridColumn: "1 / 3"}} variant="contained" color="success" type="submit">
                        {selected ? t("update") : t("create")}
                    </Button>
            </Box>

            <Typography sx={{gridRow: 5, mt: 3, fontStyle: "italic"}}>
                {t("linkSourceText")} <Link href="https://devicon.dev/" referrerPolicy="no-referrer" target="_blank">devicon.dev</Link>
            </Typography>

        </Box>
    )
}