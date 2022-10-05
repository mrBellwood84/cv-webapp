import { Appbar } from "./Components/Navigation/Appbar"
import { LanguageDialog } from "./Components/Misc/LanguageDialog"
import { Box } from "@mui/material"
import { KeyInfoCard } from "./Components/Misc/KeyInfoCard"
import { ContentButtonBox } from "./Components/Navigation/ContentButtonBox"
import { ContentContainer } from "./Components/Navigation/ContentContainer"
import { ContentButtonDrawer } from "./Components/Navigation/ContentButtonDrawer"

export const MainUser = () => {

   return (
    <Box sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "auto",
        gridTemplateRows: "max-content max-content",
    }}>
        <Appbar sx={{
            gridRow: 1,
            gridColumn: "1"
        }} />

        <Box sx={{
            gridRow: 2,
            width: "100%",
            maxWidth: "950px",
            margin: "0 auto",
            display: "grid",
            gridTemplateRows: "max-content auto",
            gridTemplateColumns: "max-content auto",
            gridGap: 5,
            pr: 1, pt: 1
        }}>
            <KeyInfoCard sx={{
                display: {xs: "none", md: "block"},
                gridRow: 1,
                gridColumn: 1,
            }} />

            <ContentButtonBox sx={{
                display: {xs: "none", md:"block"},
                gridRow: 2,
                gridColumn: 1
            }}/>

            <ContentContainer sx={{
                gridColumn: 2,
                gridRow: "1 / 4",
                pl: 1,
            }} />

            <ContentButtonDrawer sx={{
                display: {xs: "block", md: "none"}
            }} />
        </Box>

        {/* <Dashboard /> */}
        <LanguageDialog />
    </Box>
   )
}