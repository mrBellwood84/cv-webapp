import { Card, CardContent, CardMedia, SxProps, Theme, Typography } from "@mui/material"

interface IProps {
    sx?: SxProps<Theme>;
}

export const KeyInfoCard = ({sx}: IProps) => {
    return (
        <Card sx={{...sx}}>
            <CardMedia 
                component="img"
                image="./images/profile.jpg"
                alt="profile picture" 
                sx={{
                    height: "auto",
                    maxWidth: 200,
                    margin: "0 auto"
                }} />

            <CardContent>
                <Typography variant="h5" component="div">
                    DEV :: Kristian Wessel Finstad
                </Typography>
                <Typography variant="subtitle1" component="div">
                    DEV :: Selvlært Utvikler
                </Typography>
                <Typography variant="body2" component="div">
                    DEV :: my@email.com
                </Typography>

            </CardContent>
        </Card>
    )
}