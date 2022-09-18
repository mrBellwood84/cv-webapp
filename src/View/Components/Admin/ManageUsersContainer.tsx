import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { accountAgent } from "../../../Core/ApiAgent/accountAgent";
import { IAccountManaged } from "../../../Core/Data/Account/IAccountManaged";
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks";
import { adminStore } from "../../../Core/Store/Stores/adminStore";
import { utilStore } from "../../../Core/Store/Stores/utils";
import { LoadingBox } from "../Misc/LoadingBox";
import { SectionStack } from "../_Shared/SectionStack";
import { ManageUserItem } from "./ManageUserItem";

export const ManageUsersContainer = () => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const users = useAppSelector((state) => state.admin.users);

    const [searchedUsers, setSearchedUsers] = useState<IAccountManaged[]>(users)
    const [apiLoading, setApiLoading] = useState<boolean>(true)

    const createUser = () => {
        dispatch(adminStore.actions.setSelectedUser(undefined));
        dispatch(utilStore.actions.setActiveView("editUser"));
    }

    const handleSearchUser = (event: ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;

        if (value === "") {
            setSearchedUsers(users);
            return;
        }

        let result: IAccountManaged[] = []

        users.forEach(u => {
            const nameExist = `${u.firstName} ${u.lastName}`.toLowerCase().includes(value.toLowerCase());
            const usernameExist = u.userName.toLowerCase().includes(value.toLowerCase())

            if (nameExist || usernameExist) result.push(u);
        })

        setSearchedUsers(result)
    }

    useEffect(() => {
        const getAllUsers = async () => {
            if (users.length > 0) return;
            let response = await accountAgent.getAllUsers();
            if (typeof(response) === "number") return
            dispatch(adminStore.actions.setUsersList(response))
            setSearchedUsers(response)
        }
        setApiLoading(true)
        getAllUsers();
        setApiLoading(false)
    }, [dispatch, users.length])

    if (apiLoading) return <LoadingBox />

    return (
        <Fragment>

            <SectionStack title={t("manageUsers")} subfield={
                    <TextField 
                        sx={{ml: "auto"}}
                        type="text"
                        size="small"
                        variant="standard"
                        margin="none"
                        label={t("search")}
                        helperText={t("userSearchHelperText")}
                        onChange={handleSearchUser}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                    />
            }>
                {searchedUsers.length > 0 && (
                    searchedUsers.map(x => (
                        <ManageUserItem key={x.id} user={x} />
                    ))
                )}
                <Button onClick={createUser} >
                    {t("createUser")}
                </Button>
            </SectionStack>
        </Fragment>
    )
}