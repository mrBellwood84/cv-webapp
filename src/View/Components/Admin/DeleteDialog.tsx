import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IProps {
    handleClose: () => void;
    isOpen: boolean;
    contentText?: string,
    handleDelete: () => void;
    
}

export const DeleteDialog = ({handleClose, isOpen, contentText, handleDelete}: IProps) => {

    const { t } = useTranslation();

    const handleOkClick = () => {
        handleDelete();
        handleClose();
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>
                {t("deleteDialog")}
            </DialogTitle>
            <DialogContent>
                {contentText}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    {t("cancel")}
                </Button>
                <Button onClick={handleOkClick}>
                    {t("ok")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
