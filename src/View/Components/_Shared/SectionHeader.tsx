import { Box, Typography } from "@mui/material";

interface IProps {
    text: string;
}

export const SectionHeader = ({text}: IProps) => {

    return (
    <Box 
        sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column"
        }}
    >

        <Typography variant="h5" component="div" borderBottom="2px solid lightgray">
            {text}
        </Typography>



    </Box>

    )
}