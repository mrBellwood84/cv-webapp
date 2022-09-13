import { Typography } from "@mui/material";

interface IProps {
    text: string;
}

export const SectionHeader = ({text}: IProps) => {

    return (
        <Typography variant="h5" component="div" sx={{borderBottom: "2px solid lightgrey", mt: 1}}>
            {text}
        </Typography>
    )
}