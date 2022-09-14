import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { IProject } from "../../../Core/Data/IProject"
import { SectionStack } from "../_Shared/SectionStack"
import { PortfolioItem } from "./PortfolioItems"

export const ProjectContainer = () => {

    const { t } = useTranslation();

    const projects: IProject[] = [
        {
            id: "proj1",
            name: "Rolfmusic.com",
            languages: [
                {
                    id: "lang1",
                    name: "Python",
                    type: "language",
                    rating: 1,
                    svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                    text: [{
                        id: "",
                        code: "",
                        content: ""
                    }]
                }
            ],
            frameworks: [
                {
                    id: "framework1",
                    name: "Django",
                    type: "language",
                    rating: 1,
                    svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg",
                    text: [{
                        id: "",
                        code: "",
                        content: ""
                    }],
                }
            ],
            text: [
                {
                    id: "lang1",
                    code: "no",
                    content: "Jeg smekket sammen en liten nettside for et rockeband. Mitt eget rockeband faktisk. Det var en veldig god øvelse i både python og bruk av rammeverket Django. Jeg lekte meg også en del med CSS som jeg ærlig må inrømme at jeg ikke er noen verdensmester på. Men det ble en slags nettside av det da. "
                },
                {
                    id: "lang2",
                    code: "en",
                    content: "Website for rockband"
                }
            ],
            linkWebsiteUrl: "rolfmusic.com",
        },
        {
            id: "proj1",
            name: "Overtime Webapp",
            languages: [
                {
                    id: "lang1",
                    name: "Typescript",
                    type: "language",
                    rating: 1,
                    svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                    text: [{
                        id: "",
                        code: "",
                        content: ""
                    }]
                }
            ],
            frameworks: [
                {
                    id: "framework1",
                    name: "React",
                    type: "language",
                    rating: 1,
                    svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                    text: [{
                        id: "",
                        code: "",
                        content: ""
                    }],
                }
            ],
            text: [
                {
                    id: "lang1",
                    code: "no",
                    content: "Nettside for beregning av overtid"
                },
                {
                    id: "lang2",
                    code: "en",
                    content: "Website for calculating overtime"
                }
            ],
            linkRepoUrl: "github/overtime",
        },
    ]

    return (
        <Fragment>
            {projects && (projects.length > 0) && (
                <SectionStack title={t("portfolio")}>
                    {projects.map(x => (
                        <PortfolioItem key={x.id} item={x} />
                    ))}
                </SectionStack>
            )}
        </Fragment>
    )
}