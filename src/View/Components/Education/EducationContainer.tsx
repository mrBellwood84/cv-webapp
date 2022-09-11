import { Stack, Typography } from "@mui/material"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { IExperience } from "../../../Core/Data/IExperience"
import { ISchool } from "../../../Core/Data/ISchool"
import { ExperienceItem } from "../Misc/ExperienceItem"
import { SchoolItem } from "./SchoolItem"

export const EducationContainer = () => {

    const { t } = useTranslation()

    const school: ISchool[] = [
        {
            id: "sch1",
            schoolName: [
                {
                    id: "lang1",
                    code: "no",
                    content: "Bergen Videregående Skole"
                },
                {
                    id: "lang2",
                    code: "en",
                    content: "Bergen High School"
                },
            ],
            courseName: [
                {
                    id: "lang3",
                    code: "no",
                    content: "Idrettslinja"
                },
                {
                    id: "lang4",
                    code: "en",
                    content: "Sports line",
                }
            ],
            start: new Date("2000-08-01"),
            end: new Date(2003, 5),
        },
        {
            id: "sch2",
            schoolName: [
                {
                    id: "lang10",
                    code: "no",
                    content: "Universitetet i Bergen",
                },
                {
                    id: "lang11",
                    code: "en",
                    content: "Bergen University",
                }
            ],
            courseName: [
                {
                    id: "lang12",
                    code: "no",
                    content: "Arkeologi og Historie",
                },
                {
                    id: "lang13",
                    code: "en",
                    content: "Archeology and History",
                }
            ],
            start: new Date(2005, 7),
            end: new Date(2008, 5),
            text: [
                {
                    id: "lang14",
                    code: "no",
                    content: "Uferdig bachelor i arkeologi og årstudium i historie",
                },
                {
                    id:"lang15",
                    code: "en",
                    content: "Unfinished bachelor in archeology and year study in history",
                }
            ]
        }
    ]

    const otherEduc: IExperience[] = [
        {
            id: "educ1",
            type: "otherEduc",
            startDate: new Date(2004, 5),
            header: [
                {
                    id: "lang1",
                    code: "no",
                    content: "Førerkort"
                },
                {
                    id: "lang2",
                    code: "en",
                    content: "Driver Licence"
                }
            ],
            subheader: [
                {
                    id: "lang3",
                    code: "no",
                    content: "Klasse B"
                },
                {
                    id: "lang4",
                    code: "en",
                    content: "Class B"
                }
            ],
            text: [
                {
                    id: "lang4",
                    code: "no",
                    content: "Jeg liker ikke å kjøre bil..."
                },
                {
                    id: "lang5",
                    code: "en",
                    content: "I do not enjoy driving..."
                }
            ]
        }
    ]

    return <Fragment>

        {school && school.length > 0 && (
            <Fragment>
                <Typography variant="h5" component="header" sx={{borderBottom: "1px solid lightgrey"}}>
                    {t("school")}
                </Typography>
                
                <Stack spacing={3} sx={{mt:2, mb:1, width: "max-content"}}>
                    {school
                        .sort((a,b) => {
                        if (a.start > b.start) return -1
                        else return 1
                        }).map(x => (
                            <SchoolItem key={x.id} item={x} />
                    ))}
                </Stack>
            </Fragment>
        )}

        {otherEduc && (otherEduc.length > 0) && (
            <Fragment>
                <Typography variant="h5" component="div" sx={{borderBottom: "1px solid lightgrey", mt:4}}>
                    {t("course")} / {t("certifications")} / {t("other")}
                </Typography>

                <Stack spacing={3} sx={{mt: 2, mb: 1, width: "max-content"}}>
                    {otherEduc.map(x => (
                        <ExperienceItem key={x.id} item={x} />
                    ))}
                </Stack>

            </Fragment>
        )}

    </Fragment>

}