import { Box, SxProps, Tab, Tabs, Typography } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { TabPanel } from "../_Shared/TabPanel"
import { AddEditExperienceForm } from "../Experience/AddEditExperienceForm"
import { AddEditSchoolForm } from "./AddEditSchoolForm"
import { ArrowNavigation } from "../Navigation/ArrowNavigation"


interface IProps {
    sx?: SxProps,
}

export const AddEducationContainer = ({sx}: IProps) => {

    const { t } = useTranslation()

    const  [value, setValue] = useState<number>(0);

    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(4, max-content)",
            gridGap: 5,
            ...sx,
        }}>
           
           <ArrowNavigation prevPage="education" sx={{gridRow: 1}} />
           
            <Typography variant="h4" component="div" sx={{gridRow: 2}}>
                {t("addEducation")}
            </Typography>
           
            <Tabs value={value} onChange={handleTabChange} sx={{gridRow: 3, borderBottom: "1px solid lightgray"}}>
                <Tab label = {t("school")} />
                <Tab label={t("other")} />
            </Tabs>
           
            <Box sx={{gridRow: 4}}>
                <TabPanel index={0} value={value}>
                    <AddEditSchoolForm />
                </TabPanel>
                <TabPanel index={1} value={value}>
                    <AddEditExperienceForm datatype="expEduc" />
                </TabPanel>
            </Box>
           
        </Box>

    )
}