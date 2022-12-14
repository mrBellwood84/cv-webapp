import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, InputAdornment, SxProps, TextField, Typography } from "@mui/material"
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { accountAgent } from "../../../Core/ApiAgent/accountAgent";
import { IAccount } from "../../../Core/Data/Account/IAccount";
import { ISignInDto } from "../../../Core/Data/Account/ISignInDto";
import { accountStore } from "../../../Core/Store/Stores/accountStore";
import { cookeHandler } from "../../../Core/Utils/cookieHandler";
import { LoadingBox } from "../Misc/LoadingBox";

interface IProps {
    sx?: SxProps;
}

export const LoginBox = ({sx}:IProps) => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ISignInDto>();

    const [signInError, setSignInError] = useState<string | undefined>(undefined);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [apiLoading, setApiLoading] = useState<boolean>(false);

    const submit: SubmitHandler<ISignInDto> = async (data) => {
        
        setApiLoading(true)
        setSignInError(undefined)

        const response = await accountAgent.signIn(data);
        
        if (typeof(response) === "number") {
            if (response === 401) setSignInError("signinCredentialError");
            if (response === 400) setSignInError("accountExpired");
            if (response === 500) setSignInError("serverError");
            setApiLoading(false);
            return;
        }

        cookeHandler.set(response.token!, response.role)

        const account: IAccount = {
            firstName: response.firstName,
            lastName: response.lastName,
            username: response.userName,
            company: response.company,
            email: response.email,
            role: response.role,
            accountExpire: response.accountExpire,
        }

        dispatch(accountStore.actions.setAccount(account));
        setApiLoading(false);
    }

    if (apiLoading) {
        return <LoadingBox sx={{
            gridRow: 3,
            gridColumn: 2,
            mt: 5
        }} />
    }

    return (
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...sx,
             }}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(submit)}>

            <Avatar sx={{m: 1, bgcolor:"secondary.main"}}>
                <LockOutlined />
            </Avatar>

            <Typography 
                variant="h5" 
                component="div"
                sx={{color:"#666", textShadow:"1px 1px 0 #bbb"}} 
                textAlign="center">
                {t("signIn")}
            </Typography>

            <TextField 
                variant="standard"
                type="text"
                autoFocus
                autoCorrect="off"
                autoComplete="off"
                label={t("userName")}
                {...register("userName", {
                    required: "userNameRequired"
                })}
                error={errors.userName !== undefined}
                helperText={errors.userName && t(errors.userName.message!)}
                fullWidth
                margin="normal"
                /> 

            <TextField  
                id="password-field"
                variant="standard"
                type={showPassword ? "text" : "password"}
                autoCorrect="off"
                autoComplete="off"
                label={t("password")}

                {...register("password", {required: "passwordRequired"})}
                error={errors.password !== undefined}
                helperText={errors.password && t(errors.password.message!)}
                fullWidth
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                />

            {signInError && (
                <Typography variant="caption" component="div" color="darkred" fontWeight={600}>
                    {t(signInError)}
                </Typography>
            )}

            <Button
                sx={{mt: 3}}
                fullWidth
                variant="contained"
                type="submit">
                {t("signIn")}
            </Button>

        </Box>
    )
}