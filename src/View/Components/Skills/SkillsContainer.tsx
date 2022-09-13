import { Divider, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { ISkill } from "../../../Core/Data/ISkill"
import { SkillItem } from "./SkillItem"
import { SkillRatingExplained } from "./SkillRatingExplained"

export const SkillsContainer = () => {

    const { t } = useTranslation()

    const programming: ISkill[] = [
        {
            id: "prog1",
            type: "language",
            name: "Typescript",
            svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            rating: 4,
            text: [
                {
                    id: "lang1",
                    code: "no",
                    content: "Jeg er veldig glad i TypeScript"
                },
                {
                    id: "lang2",
                    code: "en",
                    content: "I love TypeScript"
                }
            ],
        },
        {
            id: "prog2",
            type: "language",
            name: "JavaScript",
            svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            rating: 4,
            text: [
                {
                    id: "lang3",
                    code: "no",
                    content: "Jeg er ikke like glad i JavaScript, men hvis man må..."
                },
                {
                    id: "lang4",
                    code: "en",
                    content: "I do not love JavaScript as much as TypeScript"
                }
            ]
        }
    ]

    const frameworks: ISkill[] = [
        {
            id: "fram1",
            type: "framework",
            name: "React",
            svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            rating: 4,
            text: [
                {
                    id: "lang5",
                    code: "en",
                    content: "I love writing front end apps with React and TypeScript",
                },
                {
                    id: "lang6",
                    code: "no",
                    content: "Jeg elsker å lage applikasjoner med react"
                }
            ]
        },
        {
            id: "fram2",
            type: "framework",
            name: "DotNetCore",
            svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
            rating: 3,
            text: [
                {
                    id: "lang7",
                    code: "no",
                    content: "Jeg liker å lage applikasjoner med NetCore, men skulle ønske jeg var flinkere",
                },
                {
                    id: "lang8",
                    code: "en",
                    content: "I enjoy creating application with NetCore, but wish i was better at it",
                }
            ]
        }
    ]

    return (
        <Fragment>
            {programming && (programming.length > 1 && (
                <Fragment>
                    <Typography variant="h5" component="div" sx={{borderBottom: "2px solid lightgrey"}}>
                        {t("programmingLanguages")}
                    </Typography>

                    <Stack 
                    spacing={2} 
                    sx={{mt: 2, mb: 2, width: "max-content", minWidth: "100%"}} 
                    divider={<Divider flexItem orientation="horizontal"/>} >
                        {programming.map(x => (
                            <SkillItem key={x.id} item={x} />
                        ))}
                    </Stack>
                </Fragment>
            ))}

            {frameworks && (frameworks.length > 1 && (
                <Fragment>
                    <Typography variant="h5" component="div" sx={{borderBottom: "2px solid lightgrey"}}>
                        {t("frameworks")}
                    </Typography>

                    <Stack 
                        spacing={2} 
                        sx={{mt: 2, mb: 1, width: "max-content", minWidth: "100%"}} 
                        divider={<Divider flexItem orientation="horizontal" />}>
                        {frameworks.map(x => (
                            <SkillItem key={x.id} item={x} />
                        ))}
                    </Stack>
                </Fragment>
            ))}

            <SkillRatingExplained />

        </Fragment>
    )
}