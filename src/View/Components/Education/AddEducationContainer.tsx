import { Box, Divider, Tab, Tabs } from "@mui/material"
import { Fragment, SyntheticEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { SectionHeader } from "../_Shared/SectionHeader"
import { TabPanel } from "../_Shared/TabPanel"
import { AddEditOtherEducForm } from "./AddEditOtherEducForm"
import { AddEditSchoolForm } from "./AddEditSchoolForm"

export const AddEducationContainer = () => {

    const { t } = useTranslation()

    const  [value, setValue] = useState<number>(0);

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <Fragment>
            <SectionHeader text={t("addEducation")}/>
            <Box sx={{ width: "100%" }}>
                <Box>
                    <Tabs value={value} onChange={handleTabChange} centered>
                        <Tab label = {t("school")} />
                        <Tab label={t("other")} />
                    </Tabs>
                </Box>
                <Divider />
                <TabPanel index={0} value={value}> 
                    <AddEditSchoolForm />
                </TabPanel>
                <TabPanel index={1} value={value}>
                    <AddEditOtherEducForm />
                </TabPanel>
            </Box>
        </Fragment>

    )
}