import { SxProps, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ArrowNavigation } from "../Navigation/ArrowNavigation"

interface IProps {
    sx: SxProps
}

export const HomeContainer = ({sx}: IProps) => {
    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(5, max-content)",
            gridGap: 5,
            ...sx,
        }}>
            <Box>
                any top stuff here
            </Box>
            <Typography variant="h6" component="div">
                Header text
            </Typography>

            <Box>
                Content goes here
            </Box>

            <ArrowNavigation nextPage="education"/>
        </Box>
    )
}