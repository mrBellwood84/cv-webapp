import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
    children?: ReactNode;
    index: number;
    value: number;
    sx?: SxProps
}

export const TabPanel = ({children, index, value, sx}: IProps) => {
    return (
        <Box sx={{...sx, }} role="tabpanel" hidden={value !== index}>
            {children}
        </Box>
    )
}