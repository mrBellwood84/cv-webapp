import { Card, CardContent, SxProps, Theme, Typography } from "@mui/material"

interface IProps {
    sx?: SxProps<Theme>;
}

export const KeyInfoCard = ({sx}: IProps) => {
    return (
        <Card sx={{...sx}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    DEV :: my name
                </Typography>

            </CardContent>
        </Card>
    )
}