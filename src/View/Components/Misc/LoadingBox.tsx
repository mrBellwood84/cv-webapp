import { Box, CircularProgress, SxProps } from "@mui/material"

interface IProps {
    sx?: SxProps;
}

export const LoadingBox = ({sx}: IProps) => {
    return (
        <Box sx={{width: "100%", height: "50%", minHeight: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress thickness={4}/>
        </Box>
    )
}