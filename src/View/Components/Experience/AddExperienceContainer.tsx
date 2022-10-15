import { Box, SxProps, Tab, Tabs, Typography } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowNavigation } from "../Navigation/ArrowNavigation";
import { TabPanel } from "../_Shared/TabPanel";
import { AddEditEmploymentForm } from "./AddEditEmploymentForm";
import { AddEditExperienceForm } from "./AddEditExperienceForm";

interface IProps {
    sx?: SxProps;
}

export const AddExperienceContainer = ({sx}: IProps) => {

    const { t } = useTranslation()
    const [value, setValue] = useState<number>(0)

    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(4, max-content)",
            gridGap: 5,
            ...sx,
        }}>
            <ArrowNavigation prevPage="experience" sx={{gridRow: 1}} />

            <Typography variant="h4" component="div" sx={{gridRow: 2}}>
                {t("addExperience")}
            </Typography>

            <Tabs value={value} onChange={handleTabChange} sx={{gridRow: 3, borderBottom: "1px solid lightgray"}}>
                <Tab label={t("employment")} />
                <Tab label={t("other")} />
            </Tabs>

            <TabPanel index={0} value={value}>
                <AddEditEmploymentForm />
            </TabPanel>

            <TabPanel index={1} value={value}>
                <AddEditExperienceForm datatype="other" />
            </TabPanel>
        </Box>
    )
}