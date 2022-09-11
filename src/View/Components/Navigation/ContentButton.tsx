import { SvgIconComponent } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

interface IProps {
    text: string;
    svg: SvgIconComponent
    onClick: () => void;
}

export const ContentButton = ({text, svg, onClick} : IProps) => {
    return (
            <ListItemButton onClick={onClick}>
                <ListItemIcon>
                    <SvgIcon component={svg} color="primary"/>
                </ListItemIcon>
                <ListItemText color="primary">
                    {text}
                </ListItemText>
            </ListItemButton>
    )
}