import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetStoryByIdQuery } from "../../store/api";
import { replaceNonDigits } from "../../utils/replaceNonDigits";
import { CommentCard } from "../../components/commentCard";
import Button from "@mui/material/Button/Button";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";
import { formatSecondsToDateString } from "../../utils/formatting";

export type storyParams = {
    id: string
}

export const StoryPage: React.FC = () => {
    const { id } = useParams<storyParams>()

    const { data, isLoading, refetch, isFetching } = useGetStoryByIdQuery(+replaceNonDigits(id))

    if (isLoading)
        return <CircularProgress />

    const renderComments = () => {
        if (isFetching)
            return <CircularProgress />

        if (!data.kids)
            return null

        return data.kids.map(commentId => <CommentCard key={commentId} id={commentId} />)
    }

    return (
        <Stack spacing={2}>
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={5}
                alignItems="center"
            >
                <Typography variant="caption">
                    {data.title}
                </Typography>

                <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                >
                    Back to main
                </Button>
            </Stack>

            <Stack
                justifyContent="space-between"
                direction="row"
            >
                <div>
                    by: {data.by}
                </div>
                <div>
                    {formatSecondsToDateString(data.time)}
                </div>
            </Stack>
            <div>
                score: {data.score}
            </div>
            <Button
                sx={{
                    width: '30%',
                    backgroundColor: 'primary.main'
                }}
                variant='contained'
                href={data.url}
                target="_blank"
            >
                source
            </Button>
            <Stack spacing={2}>
                <div>
                    comments: {data.descendants}
                </div>
                <Button
                    onClick={refetch}
                    variant="outlined"
                    sx={{
                        width: '30%'
                    }}
                >
                    Refresh comments
                </Button>
            </Stack>

            <div>
                {renderComments()}
            </div>
        </Stack>
    )
}