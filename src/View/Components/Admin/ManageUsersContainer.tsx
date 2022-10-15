import { Add, Search } from "@mui/icons-material";
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { accountAgent } from "../../../Core/ApiAgent/accountAgent";
import { IAccountManaged } from "../../../Core/Data/Account/IAccountManaged";
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks";
import { adminStore } from "../../../Core/Store/Stores/adminStore";
import { utilStore } from "../../../Core/Store/Stores/utilsStore";
import { LoadingBox } from "../Misc/LoadingBox";
import { ArrowNavigation } from "../Navigation/ArrowNavigation";
import { SectionStack } from "../_Shared/SectionStack";
import { ManageUserItem } from "./ManageUserItem";


const sortTypeStrings: string[] = [
    "sortByName",
    "sortByUserName",
    "sortByExpire",
    "sortByCompany",
    "sortByLogins",
]

const sortUsers = (userList: IAccountManaged[], sortType: string) => {

    let copy = [...userList]
    if (userList.length === 0) return []
    
    switch(sortType) {
        case sortTypeStrings[0]:
            return copy.sort((a,b) => {
                if (`${a.firstName}${a.lastName}`.toLowerCase() < `${b.firstName}${b.lastName}`.toLowerCase()) return -1;
                return 1
            }) 

        case sortTypeStrings[1]:
            return copy.sort((a,b) => {
                if (a.userName < b.userName) return -1
                return 1
            })

        case sortTypeStrings[2]:
            return copy.sort((a,b) => {
                if (a.accountExpire < b.accountExpire) return -1
                return 1
            })

        case sortTypeStrings[3]:
            return copy.sort((a,b) => {
                let value1 = a.company?.toLowerCase();
                let value2 = b.company?.toLowerCase();

                if (!value1) return 1
                if (!value2) return -1
                if (value1 < value2) return -1
                return 1

            })

        case sortTypeStrings[4]:
            return copy.sort((a,b) => {
                if (a.loginCount < b.loginCount) return 1
                return -1
            })

        default:
            return userList
    }
}

interface IProps {
    sx?: SxProps;
}

export const ManageUsersContainer = ({sx}: IProps) => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const allUsers = useAppSelector((state) => state.admin.users);

    const [sortType, setSortType] = useState<string>("sortByName");
    const [searchedUsers, setSearchedUsers] = useState<IAccountManaged[]>(sortUsers(allUsers, sortTypeStrings[0]))
    const [apiLoading, setApiLoading] = useState<boolean>(true)

    const createUser = () => {
        dispatch(adminStore.actions.setSelectedUser(undefined));
        dispatch(utilStore.actions.setActiveView("editUser"));
    }

    const handleSearchUser = (event: ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;

        if (value === "") {
            setSearchedUsers(sortUsers(allUsers, sortType));
            return;
        }

        let result: IAccountManaged[] = []

        allUsers.forEach(u => {
            const nameExist = `${u.firstName} ${u.lastName}`.toLowerCase().includes(value.toLowerCase());
            const usernameExist = u.userName.toLowerCase().includes(value.toLowerCase())
            const companyExist = u.company?.toLowerCase().includes(value.toLowerCase())

            if (nameExist || usernameExist || companyExist) result.push(u);
        })
        if (result.length <= 1) setSearchedUsers(result);

        setSearchedUsers(sortUsers(result, sortType))
    }

    const handleSortChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSortType(value);
        setSearchedUsers(sortUsers(searchedUsers, value))
    }

    useEffect(() => {
        const getAllUsers = async () => {
            if (allUsers.length > 0) return;
            let response = await accountAgent.getAllUsers();
            if (typeof(response) === "number") return
            dispatch(adminStore.actions.setUsersList(response))
            setSearchedUsers(sortUsers(response, sortTypeStrings[0]))
        }

        setApiLoading(true)
        getAllUsers();
        setApiLoading(false)
    }, [dispatch, allUsers.length])

    if (apiLoading) return <LoadingBox sx={{...sx}} />

    return (
        <Box sx={{
            display: "grid",
            gridTemplateRows: "repeat(5, max-content)",
            gridGap: 5,
            ...sx,
        }} >

            <Box sx={{
                gridRow: 1,
                display: "flex",
                justifyContent: "space-between",
            }}>
                <ArrowNavigation prevPage="home" sx={{gridRow: 1}} />
                <Button onClick={createUser} startIcon={<Add />}>
                        {t("createUser")}
                </Button>
            </Box>

            <Typography
                sx={{gridRow: 2}}
                variant="h4" component="div">
                    {t("manageUsers")}
            </Typography>


            <Box sx={{
                width:"100%",
                display: "flex",
                alignItems: "baseline"
            }}>

                <FormControl variant="standard" sx={{minWidth: 120}} size="small">

                    <InputLabel variant="standard">{t("sort")}</InputLabel>

                    <Select
                        value={sortType}
                        onChange={handleSortChange}
                    >
                        {sortTypeStrings.map(x => (
                            <MenuItem key={x} value={x} defaultValue={x === sortType ? x : undefined}>
                                {t(x)}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>

                <TextField 
                    sx={{ml: "auto"}}
                    type="text"
                    size="small"
                    variant="standard"
                    margin="none"
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={handleSearchUser}
                    placeholder={t("search")}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}

                />
            </Box>

            <SectionStack sx={{gridRow: 4}}  >
                {searchedUsers.length > 0 && (
                    searchedUsers.map(x => (
                        <ManageUserItem key={x.id} user={x} />
                    ))
                )}
            </SectionStack> 
        </Box>
    )
}