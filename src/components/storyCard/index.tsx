import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";
import { useGetStoryByIdQuery } from "../../store/api";

export const StoryCard: React.FC<{ id: number }> = props => {
    const { data, isLoading } = useGetStoryByIdQuery(props.id)

    if (isLoading)
        return (
            <Skeleton
                sx={{
                    marginBottom: '1rem'
                }}
                variant="rectangular"
                width={210}
                height="1rem"
            />
        )

    return (
        <Box sx={{
            marginBottom: '1rem'
        }}>
            {data?.title}
            <Link to={`/story/id=${props.id}`}>
                go to story page
            </Link>
        </Box>
    )
}