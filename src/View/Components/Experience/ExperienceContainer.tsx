import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { IEmployment } from "../../../Core/Data/Experience/IEmployment"
import { IExperience } from "../../../Core/Data/Experience/IExperience"
import { ExperienceItem } from "../Misc/ExperienceItem"
import { SectionStack } from "../_Shared/SectionStack"
import { EmploymentItem } from "./EmploymentItem"

export const ExperienceContainer = () => {

    const { t } = useTranslation()

    const employment: IEmployment[] = [
        {
            id: "empl1",
            employer: "Rema 1000",
            startDate: new Date(2005, 7),
            positions: [
                {
                    id: "pos1",
                    type: "employmentData",
                    startDate: new Date(2005, 7).toISOString(),
                    endDate: new Date(2010, 5).toISOString(),
                    header: [
                        {
                            id: "lang1",
                            code:"no",
                            content:"Ryddegutt",
                        },
                        {
                            id: "lang2",
                            code: "en",
                            content: "Cleaningboy"
                        }
                    ],
                    text: [
                        {
                            id: "lang3",
                            code: "no",
                            content: "Rydding og vasking i butikk, putte varer i hyller",
                        },
                        {
                            id: "lang4",
                            code: "en",
                            content: "Cleaning and maintaining the store, restocking shelfs"
                        }
                    ],
                },
                {
                    id: "pos2",
                    type: "employmentData",
                    startDate: new Date(2010, 5).toISOString(),
                    endDate: new Date(2016, 8).toISOString(),
                    header: [
                        {
                            id: "lang5",
                            code: "no",
                            content: "Butikkmedarbeider"
                        },
                        {
                            id: "lang6",
                            code: "en",
                            content: "Shop Assistand"
                        }
                    ],
                    text: [
                        {
                            id: "lang7",
                            code: "no",
                            content: "Full butikkmedarbeider med ansvar for kasse og bestilling",
                        },
                        {
                            id: "lang8",
                            code: "en",
                            content: "Full-time shop employee with responsibility for checkout and ordering",

                        }
                    ]
                },
                {
                    id: "pos3",
                    type: "employmentData",
                    startDate: new Date(2016, 8).toISOString(),
                    header: [
                        {
                            id: "lang9",
                            code: "no",
                            content: "Butikksjef",
                        },
                        {
                            id: "lang10",
                            code: "en",
                            content: "Store Manager",
                        }
                    ],
                    text: [
                        {
                            id: "lang11",
                            code: "no",
                            content: "Personell og økonomisk ansvar",
                        },
                        {
                            id: "lang12",
                            code: "en",
                            content: "Personnel and financial responsibility",
                        }
                    ]
                }
            ],
            references: [
                {
                    id: "ref1",
                    name: "Skinke-Hitler",
                    role: [
                        {
                            id: "lang1",
                            code: "no",
                            content: "Konsernsjef"
                        },
                        {
                            id: "lang2",
                            code: "en",
                            content: "CEO"
                        }
                    ],
                    phonenumber: "+47 55 56 57 58",
                    email: "hamhitler@mail.com",
                },
                {
                    id: "ref2",
                    name: "Kåre Kassemann",
                    role: [
                        {
                            id: "lang3",
                            code: "no",
                            content: "Skiftleder"
                        },
                        {
                            id: "lang4",
                            code: "en",
                            content: "Shift Manager"
                        }
                    ],
                    phonenumber: "+47 97 55 00 55",
                    email: "kaare.k.hansen@email.com",

                }
            ]
        }
    ]

    const otherExperiences: IExperience[] = [
        {
            id: "exp",
            type: "expericence",
            startDate: new Date(2010, 5).toISOString(),
            header: [
                {
                    id: "lang10",
                    code: "no",
                    content: "Sture og Snørrnesene"
                },
                {
                    id: "lang11",
                    code: "en",
                    content: "Sture & the Snotnoses"
                }
            ],
            subheader: [
                {
                    id: "lang12",
                    code: "no",
                    content: "Gitarist i rockeband"
                },
                {
                    id: "lang13",
                    code: "en",
                    content: "Guitarist in a rockband"
                }
            ],
            text: [
                {
                    id: "lang14",
                    code: "no",
                    content: "Skrev halvparten av låtene, men drakk all pilsen",
                },
                {
                    id: "lang15",
                    code: "en",
                    content: "Wrote half of the songs, but drank all the beer",
                }
            ]
        }
    ]

    return (
        <Fragment>

            {employment && (employment.length > 0) && (
                <SectionStack title={t("workExperience")}>
                    {employment.sort((a,b) => {
                        if (a.startDate > b.startDate) return -1;
                        else return 1;
                    }).map(x => (
                        <EmploymentItem key={x.id} item={x} />
                    ))}
                </SectionStack>
            )}

            {otherExperiences && (otherExperiences.length > 0) && (
                <SectionStack title={t("other")}>
                    {otherExperiences.map(x => (
                        <ExperienceItem key={x.id} item={x} />
                    ))}
                </SectionStack>
            )}

        </Fragment>
    )
}