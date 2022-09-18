import { Delete, Password } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { accountAgent } from "../../../Core/ApiAgent/accountAgent";
import { IAccountManaged } from "../../../Core/Data/Account/IAccountManaged";
import { useAppDispatch, useAppSelector } from "../../../Core/Store/hooks"
import { adminStore } from "../../../Core/Store/Stores/adminStore";
import { utilStore } from "../../../Core/Store/Stores/utils";
import { LoadingBox } from "../Misc/LoadingBox";
import { DeleteDialog } from "./DeleteDialog";

export const CreateEditUserForm = () => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [registerError, setRegisterError] = useState<string | undefined>(undefined);
    const [confirmPasswordChange, setConfirmPasswordChange] = useState<boolean>(false)
    const [apiLoading, setApiLoading] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    const selectedUser = useAppSelector((state) => state.admin.selectedUser)
    const usernames = useAppSelector((state) => state.admin.users).map(x => x.userName)
    const edit = Boolean(selectedUser);

    const orginDate = selectedUser?.accountExpire.toString().split("T")[0];
    const dateMin = new Date().toISOString().split("T")[0]
    let dateMax: Date | string = new Date()
    dateMax.setDate(dateMax.getDate() + 21)
    dateMax = dateMax.toISOString().split("T")[0]    

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IAccountManaged>({
        defaultValues: edit ? {
            ...selectedUser,
            accountExpire: orginDate,
        } : {
            accountExpire: dateMax,
        },
    });

    const generateRandomPassword = () => {
        const pwdLenght = 16;
        const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
        let result = ""
        for (let i = 0; i < pwdLenght; i++) {
            let rand = Math.floor(Math.random() * characters.length)
            if (rand < 26) {
                let rand_2 = Math.round(Math.random());
                if (rand_2 === 1) {
                    result += characters[rand].toUpperCase();
                    continue;
                }
            }
            result += characters[rand]
        }
        setValue("password", result)
    }

    const passwordExist = Boolean(watch("password"))

    const resolveUniqueUsername = (username: string) => {
        if (edit) return true;
        return !usernames.includes(username)
    }

    const changed = edit && (
        (watch("firstName")) !== selectedUser?.firstName ||
        (watch("lastName")) !== selectedUser?.lastName ||
        (watch("company")) !== selectedUser?.company ||
        (watch("email")) !== selectedUser?.email ||
        (watch("accountExpire")) !== orginDate )


    const submit: SubmitHandler<IAccountManaged> = async (data) => {

        setApiLoading(true)
        setRegisterError(undefined)

        const success = edit ? await updateUser(data) : await createUser(data);
        setApiLoading(false)

        if (success) dispatch(utilStore.actions.setActiveView("manageUsers"))
    }

    const createUser = async (data: IAccountManaged): Promise<boolean> => {
        const response = await accountAgent.createUser(data)
        if (typeof(response) === "number") {
            if (response === 500) setRegisterError("serverError")
            setRegisterError("createUserFailed")
            return false
        }
        dispatch(adminStore.actions.addNewUser(response))
        return true;
    }

    const updateUser = async (data: IAccountManaged): Promise<boolean> => {
        const response = await accountAgent.updateUser(data)
        if (typeof(response) === "number") {
            if (response === 500) setRegisterError("serverError")
            setRegisterError("editUserFailed")
            return false;
        }
        dispatch(adminStore.actions.updateUser(response))
        return true
    }

    const deleteUser = async () => {
        if (!selectedUser) return;
        setApiLoading(true)
        const response = await accountAgent.deleteUser(selectedUser.id);
        if (response !== 200) {
            setRegisterError("deleteUserFailed")
            return
        }
        dispatch(adminStore.actions.removeUser(selectedUser.id))
        dispatch(utilStore.actions.setActiveView("manageUsers"));
        setApiLoading(false)
    }

    if (apiLoading) return <LoadingBox />

    return (
        <Box
            sx={{
                mt: 2, ml: 2, mr: 2,
                display: "grid",
                gridTemplateRows: "repeat(8, max-content)",
                gridTemplateColumns: "1fr 1fr max-content",
                gridGap: "10px",
                alignItems: "center"
            }} 
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(submit)}
        >
            <DeleteDialog 
                isOpen={deleteDialogOpen}
                handleClose={() => setDeleteDialogOpen(false)}
                contentText={`${t("deleteText")} ${selectedUser ? selectedUser.userName : ""}?`}
                handleDelete={() => deleteUser()} />


            {edit && (
                <Fragment>
                    <Box sx={{gridColumn: "1 / 3", gridRow: 1}}>
                        <b>{"Id: "}</b><span>{selectedUser?.id}</span>
                    </Box>

                    <Tooltip title={t("deleteAccount")} sx={{gridColumn: 3, gridRow: 1}}>
                        <IconButton onClick={() => setDeleteDialogOpen(true)}>
                            <Delete color="error" />
                        </IconButton>
                    </Tooltip>
                </Fragment>
            )}

            <TextField
                sx={{gridColumn: 1, gridRow: 2}}
                id="firstname"
                variant="standard"
                type="text"
                autoCorrect="off"
                fullWidth

                label={t("firstName")}
                {...register("firstName", {required: "firstNameRequired"})}
                error={errors.firstName !== undefined}
                helperText={errors.firstName && t(errors.firstName.message!)}
            />

            <TextField
                sx={{gridColumn: 2, gridRow: 2}}
                id="lastname"
                variant="standard"
                type="text"
                autoCorrect="off"
                fullWidth

                label={t("lastName")}
                {...register("lastName", {required: "lastNameRequired"})}
                error={errors.lastName !== undefined}
                helperText={errors.lastName && t(errors.lastName.message!)}
            />

            <TextField
                sx={{gridColumn: 1, gridRow: 3}}
                id="username"
                variant="standard"
                type="text"
                autoCorrect="off"
                fullWidth

                label={t("userName")}
                {...register("userName", {
                    required: "userNameRequired",
                    validate: {
                        unique: v => resolveUniqueUsername(v) || "usernameExistError"
                        // unique: v => (!usernames.includes(v.toLowerCase()) && edit) || "usernameExistError"
                    }
                })}
                disabled={edit}
                error={errors.userName !== undefined}
                helperText={errors.userName && t(errors.userName.message!)}
            />

            <TextField
                sx={{gridColumn: 2, gridRow: 3}}
                id="password"
                variant="standard"
                type="text"
                autoCorrect="off"
                fullWidth

                InputLabelProps={{
                    shrink: passwordExist
                }}

                label={edit ? t("newPassword") : t("password")}
                {...register("password", {
                    required: edit ? false : true,
                })}
                error={errors.password !== undefined}
                helperText={errors.password && t("passwordRequired")}
            />

            <Tooltip title={t("generateRandomPassword")} sx={{gridColumn: 3, gridRow: 3}}>
                <IconButton onClick={generateRandomPassword}>
                    <Password />
                </IconButton>
            </Tooltip>

            <TextField
                sx={{gridColumn: 1, gridRow: 4}}
                id="company"
                variant="standard"
                type="text"
                autoCorrect="off"
                fullWidth

                label={t("company")}
                {...register("company")}
            />

            <TextField
                sx={{gridColumn: 2, gridRow: 4}}
                id="email"
                variant="standard"
                type="text"
                autoCorrect="off"
                fullWidth

                label={t("email")}
                {...register("email", {
                    required: "emailRequired",
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "emailPatternError"
                    }
                })}
                error={errors.email !== undefined}
                helperText={errors.email && t(errors.email.message!)}
            />

            <TextField
                sx={{gridColumn: "1 / 3 ", gridRow: 5}}
                id="expire"
                variant="standard"
                type="date"
                InputProps={{
                    inputProps: {
                        min: dateMin,
                        max: dateMax
                    }
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                autoCorrect="off"
                fullWidth

                label={t("expire")}
                {...register("accountExpire")}

            />

            {registerError && (
                <Typography 
                    sx={{
                        gridRow: 8, gridColumn: "1 / 3",
                        color: "darkred",
                        fontWeight: 600,
                    }}
                    variant="caption">
                        {t(registerError)}
                    </Typography>
            )}

            <Button 
                sx={{gridColumn: "1 / 3", gridRow: 7}}
                variant="contained"
                color="success"
                type="submit"
                disabled={!changed && edit && (confirmPasswordChange ? !confirmPasswordChange : true)}
            >
                    {edit ? t("update") : t("create")}
            </Button>
 
            {edit && passwordExist && (
                <FormGroup sx={{gridColumn: "1 / 3", gridRow: 6}}>
                    <FormControlLabel
                        label={t("confirmNewPassword")}
                        control={<Checkbox 
                            checked={confirmPasswordChange}
                            onChange={() => setConfirmPasswordChange(!confirmPasswordChange)} />}
                    />
                </FormGroup>
            )}


        </Box>
    )
}