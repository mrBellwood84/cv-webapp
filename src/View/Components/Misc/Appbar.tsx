import { Box } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"


export const Appbar = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        DEV :: Logo
                    </Typography>
                    <Button color="inherit">DEV :: Language</Button>
                    <Button color="inherit">DEV :: Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}