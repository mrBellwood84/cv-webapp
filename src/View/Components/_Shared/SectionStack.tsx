import { Divider, Stack } from "@mui/material";
import { Fragment, ReactNode } from "react"
import { SectionHeader } from "./SectionHeader";

interface IProps {
    children: ReactNode;
    title: string
    subfield?: JSX.Element
}

export const SectionStack = ({children, title, subfield}: IProps) => {

    return (
        <Fragment>
            <SectionHeader text={title} subfield={subfield}/>
            <Stack spacing={2}
                sx={{
                    width: "100%",
                    mt: 2, mb: 2
                }}
                divider={<Divider flexItem orientation="horizontal" />}>
                    {children}
                </Stack>
        </Fragment>
    )

}