import { Box, CircularProgress, SxProps } from "@mui/material"

interface IProps {
    sx?: SxProps;
}

export const LoadingBox = ({sx}: IProps) => {
    return (
        <Box sx={{...sx}}>
            <CircularProgress thickness={4}/>
        </Box>
    )
}