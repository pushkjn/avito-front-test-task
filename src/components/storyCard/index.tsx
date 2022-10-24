import React from "react";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import Stack from "@mui/material/Stack/Stack";
import { Link } from "react-router-dom";
import { Story } from "../../type"

export type StoryCardProps = {
    story: Story
    colored?: boolean
}

export const StoryCard: React.FC<StoryCardProps> = props => (
    <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        sx={{
            marginBottom: '1rem',
            backgroundColor: props.colored ? 'primary.light' : 'none',
            padding: '1rem'
        }}
    >
        <Typography variant="body1">
            {props.story.title}
        </Typography>
        <Button
            component={Link}
            to={`/story/${props.story.id}`}
        >
            go to story page
        </Button>
    </Stack>
)