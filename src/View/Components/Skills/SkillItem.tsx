import { School, SchoolOutlined } from "@mui/icons-material";
import { Box, Rating, Typography } from "@mui/material";
import { ISkill } from "../../../Core/Data/ISkill";
import { useAppSelector } from "../../../Core/Store/hooks";

interface IProps {
    item: ISkill;
}

export const SkillItem = ({item,}: IProps) => {
    
    const lang = useAppSelector((state) => state.utils.language)

    return (
        <Box>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <img src={item.svgUrl} alt={`${item.name} logo`} height={40}/>
                <Typography variant="h6" component="div" sx={{ml: 2}}>
                    {item.name.toString()}
                </Typography>
                <Rating 
                    name="test" 
                    value={item.rating} 
                    icon={<School sx={{color: "gray"}} />}
                    emptyIcon={<SchoolOutlined />}
                    readOnly 
                    sx={{ml: "auto"}} />
            </Box>
            <Typography variant="body1" component="div" sx={{mt: 1}}>
                {item.text.find(x => x.code === lang)?.content}
            </Typography>
        </Box>

    )
}