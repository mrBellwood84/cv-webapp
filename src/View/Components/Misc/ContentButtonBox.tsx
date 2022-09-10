import { Box, Divider, List, ListItem, ListItemButton, SxProps, Theme } from "@mui/material"
import { useAppDispatch } from "../../../Core/Store/hooks";
import { navigationStore } from "../../../Core/Store/Stores/navigation";
import { ContentButton } from "./ContentButton";

interface IProps {
    sx?: SxProps<Theme>;
}

export const ContentButtonBox = ({sx}: IProps) => {

    const dispatch = useAppDispatch();

    const btnClick = (key: string) => {
        dispatch(navigationStore.actions.setActiveView(key));
    }

    return (
        <Box sx={{...sx, width: "100%", maxWidth: 360, bgcolor: ""}}>
            <List>
                <ContentButton text="dev :: Home" onClick={() => btnClick("")} />
                <ContentButton text="dev :: Education" onClick={() => btnClick("education")} />
                <ContentButton text="dev :: Workexperience" onClick={() => btnClick("experience")} />
                <ContentButton text="dev :: Skills" onClick={() => btnClick("skills")} />
                <ContentButton text="dev :: Projects" onClick={() => btnClick("projects")} />
                <Divider />
                <ContentButton text="dev :: Export pdf" onClick={() => alert("not implemnted")} />
            </List>
        </Box>
    )
}