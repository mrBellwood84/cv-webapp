import { Box, Divider, Stack, SxProps } from "@mui/material";
import { ReactNode } from "react"
import { SectionHeader } from "./SectionHeader";

interface IProps {
    children?: ReactNode;
    title?: string;
    sx?: SxProps
}

export const SectionStack = ({children, title, sx }: IProps) => {

    return (
        <Box sx={{...sx}}>

            {title && (<SectionHeader text={title} />)}
            
            <Stack spacing={2}
                sx={{ width: "100%", mt: 2, mb: 2 }}
                divider={<Divider flexItem orientation="horizontal" />}>
                    {children}
            </Stack>
        </Box>
    )

}