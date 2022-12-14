import { Box, CircularProgress, SxProps } from "@mui/material"

interface IProps {
    sx?: SxProps;
}

export const LoadingBox = ({sx}: IProps) => {
    return (
        <Box sx={{
            width: "100%",
            height: 250,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...sx,

        }} >
            <CircularProgress thickness={4}/>
        </Box>
    )
}