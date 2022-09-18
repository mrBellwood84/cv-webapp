import { Container } from "@mui/material"
import { KeyInfoCard } from "./KeyInfoCard"
import { ContentButtonBox } from "../Navigation/ContentButtonBox"
import { ContentContainer } from "../Navigation/ContentContainer"

export const Dashboard = () => {

    return (
        <Container sx={{
            mt: 3,
            display: "grid",
            gridGap: 5,
            gridTemplateColumns: "max-content auto",
            gridTemplateRows: "max-content max-content auto",
        }}>
            <KeyInfoCard sx={{gridColumn: 1, gridRow: 1}} />
            <ContentButtonBox sx={{gridColumn: 1, gridRow: 2}} />
            <ContentContainer sx={{gridColumn: 2, gridRow: "1 / 4", pl: 2}} />
        </Container>
    )
}