import { ListItem, ListItemButton } from "@mui/material";

interface IProps {
    text: string;
    onClick: () => void;
}

export const ContentButton = ({text, onClick} : IProps) => {
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClick}>
                {text}
            </ListItemButton>
        </ListItem>

    )
}