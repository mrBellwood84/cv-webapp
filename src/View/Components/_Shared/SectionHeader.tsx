import { Box, Typography } from "@mui/material";

interface IProps {
    text: string;
    subfield?: JSX.Element
}

export const SectionHeader = ({text, subfield}: IProps) => {

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

        {subfield}


    </Box>

    )
}