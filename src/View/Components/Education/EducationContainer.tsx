import { Typography } from "@mui/material"
import { Fragment } from "react"

export const EducationContainer = () => {

    return <Fragment>
        <h3>Education</h3>
        <p>This page should contain education info boxes as they are expected in a CV</p>
        <p>This page may also contain addional information about the education</p>

        <Typography variant="h6" component="header">
            dev::school
        </Typography>

        <Typography variant="h6" component="header">
            dev::courses / certifications / other
        </Typography>
    </Fragment>

}