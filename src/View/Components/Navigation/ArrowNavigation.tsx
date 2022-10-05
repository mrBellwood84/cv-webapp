import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Button, SxProps } from "@mui/material";
import { Box } from "@mui/system"
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../Core/Store/hooks";
import { utilStore } from "../../../Core/Store/Stores/utils";

interface IProps {
    nextPage?: string;
    prevPage?: string;
    sx?: SxProps;
}

export const ArrowNavigation = ({nextPage, prevPage, sx,}: IProps) => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const handleClick = (key: string) => {
        dispatch(utilStore.actions.setActiveView(key))
    }

    return (
        <Box sx={{...sx, display: "flex"}}>
                {prevPage && (
                    <Button startIcon={<NavigateBefore />} onClick={() => handleClick(prevPage)}>
                        {t(prevPage)}
                    </Button>
                )}
                {nextPage && (
                    <Button endIcon={<NavigateNext />} onClick={() => handleClick(nextPage)}>
                        {t(nextPage)}
                    </Button>
                )}
        </Box>
    )
}