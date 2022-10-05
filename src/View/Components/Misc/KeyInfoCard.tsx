import { Card, CardContent, CardMedia, SxProps, Theme, Typography } from "@mui/material"
import { IApplicant } from "../../../Core/Data/Others/IApplicant";
import { useAppSelector } from "../../../Core/Store/hooks";

interface IProps {
    sx?: SxProps<Theme>;
}

export const KeyInfoCard = ({sx}: IProps) => {

    const lang = useAppSelector((state) => state.utils.language)

    const applicant: IApplicant = {
        id: "ap1",
        name: "My famous name",
        title: [
            {
                id: "lang1",
                code: "no",
                content: "Selvlært utvikler"
            },
            {
                id: "lang2",
                code: "en",
                content: "Self Taught Developer"
            }
        ],
        email: "my@email.com"
    }

    return (
        <Card sx={{...sx}}>
            <CardMedia 
                component="img"
                image="./images/profile.jpg"
                alt="profile picture" 
                sx={{
                    height: "auto",
                    maxWidth: "200px",
                    margin: "0 auto"
                }} />

            <CardContent>
                <Typography variant="h5" component="div">
                    {applicant.name}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {applicant.title.find(x => x.code === lang)?.content}
                </Typography>
                <Typography variant="body2" component="div">
                    {applicant.email}
                </Typography>

            </CardContent>
        </Card>
    )
}