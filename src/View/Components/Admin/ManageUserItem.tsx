import { ManageAccounts } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IAccountManaged } from "../../../Core/Data/Account/IAccountManaged"
import { useAppDispatch } from "../../../Core/Store/hooks";
import { adminStore } from "../../../Core/Store/Stores/adminStore";
import { utilStore } from "../../../Core/Store/Stores/utilsStore";

interface IProps {
    user: IAccountManaged;
}

export const ManageUserItem = ({user}: IProps) => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch()

    let dateNow = new Date()
    dateNow.setDate(new Date().getDate() - 1)
    const dateExpired = new Date(user.accountExpire.split("T")[0])
    const expired = dateExpired < dateNow;

    const setEditUser = () => {
        dispatch(adminStore.actions.setSelectedUser(user));
        dispatch(utilStore.actions.setActiveView("editUser"));
    }

    return (
        <Box sx={{
            display: "grid", 
            gridTemplateColumns: "auto max-content", 
            width: "100%",
            alignItems: "center"
        }}>

            <Box sx={{
                gridColumn: 1,
                display: "grid",
                gridTemplateRows: "repeat(4, max-content)",
                gridTemplateColumns: "50% 50%",
                alignItems: "baseline"
            }}>

                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{
                        gridColumn: 1,
                        gridRow: 1,
                    }}>
                    {user.firstName} {user.lastName}
                </Typography>

                <Typography 
                    variant="subtitle2" 
                    component="div" 
                    sx={{
                        gridColumn: 2,
                        gridRow: 1,
                    }}>
                    {user.company}
                </Typography>
                
                <Typography 
                    variant="body2" 
                    component="div" 
                    sx={{
                        gridColumn: 1,
                        gridRow: 2,
                    }}>
                        {`${t("userName")}: ${user.userName}`}
                </Typography>
                
                <Typography 
                    variant="body2" 
                    component="div" 
                    sx={{
                        gridColumn: 2,
                        gridRow: 2,
                    }}>
                    {user.email}
                </Typography>
                
                <Typography 
                    variant="caption" 
                    component="div" 
                    sx={{
                        fontWeight: 600,
                        gridColumn: 1,
                        gridRow: 4,
                        mt: 1,
                        color: expired ? "red" : "black",
                    }}>

                    {expired ? `${t("expired")} ` : `${t("expire")} `}
                    {user.accountExpire.toString().split("T")[0].replaceAll("-",".")}
                </Typography>

                <Typography 
                    variant="caption" 
                    component="div"
                    sx={{
                        gridRow: 3,
                        gridColumn: 2,
                        mt: 1
                    }}>
                        {`${t("loginCount")}: ${user.loginCount}`}
                </Typography>

                <Typography 
                    variant="caption" 
                    component="div"
                    sx={{
                        gridRow: 4,
                        gridColumn: 2,
                        mt: 1
                    }}>
                        {`${t("pdfExported")}: ${user.exportedPdf ? t("yes") : t("no")}`}
                </Typography>

            
            </Box>

            <Box sx={{gridColumn: 2}}>
                <IconButton sx={{widht:"max-content"}} onClick={setEditUser}>
                    <ManageAccounts 
                        color="primary" fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    )
}