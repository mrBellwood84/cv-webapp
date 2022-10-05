import { Box, SxProps, Typography } from "@mui/material";

interface IProps {
    text: string;
    sx?: SxProps;
}

export const SectionHeader = ({text, sx}: IProps) => {

    return (
    <Box 
        sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            ...sx,
        }}
    >

        <Typography variant="h5" component="div" borderBottom="2px solid lightgray">
            {text}
        </Typography>



    </Box>

    )
}