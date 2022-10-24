import { Alert, Button, Skeleton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StoryCard } from "../../components/storyCard";
import { useInterval } from "../../hooks/useInterval";
import { useLazyGetStoriesQuery } from "../../store/api";
import { STORIES_AMOUNT, UPDATE_NEWS_INTERVAL } from "./config";

export const Main: React.FC = () => {
    const [upToDate, setUpToDate] = useState(false)
    const [getStories, stories] = useLazyGetStoriesQuery()

    useEffect(() => {
        getStories(STORIES_AMOUNT)
    }, [])
    /* useEffect(() => {
        getLatestStories()
    }, []) */

    useInterval(() => getStories(STORIES_AMOUNT), UPDATE_NEWS_INTERVAL)

    const handleRefetch = async (showMessage?: boolean) => {
        const oldFirst = stories.data[0].id

        const responce = await getStories(STORIES_AMOUNT)

        if (!showMessage)
            return

        if (responce.data[0].id == oldFirst)
            setUpToDate(true)
    }

    const renderStories = () => {
        if (!stories.data || stories.isLoading || stories.isFetching)
            return Array(STORIES_AMOUNT / 2).fill(null).map((_, idx) => (
                <Skeleton
                    key={idx}
                    sx={{
                        height: '5rem'
                    }}
                />
            ))

        const indexIsEven = (idx: number) => idx % 2 === 0
        console.log(stories.data, 'data')
        return (
            [...stories.data]
                .sort((a, b) => b.time - a.time)
                .map((story, idx) => (
                    <StoryCard story={story} key={story.id} colored={indexIsEven(idx)} />
                ))
        )
    }

    const displaySnackBars = () => (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={stories.isError}
                autoHideDuration={3000}
            >
                <Alert severity="error">
                    An error occured
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={upToDate}
                autoHideDuration={3000}
                onClose={() => setUpToDate(false)}
            >
                <Alert
                    severity="success"
                    onClose={() => setUpToDate(false)}
                >
                    Everything is up to date
                </Alert>
            </Snackbar>
        </>
    )

    return (
        <div>
            <Button
                sx={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginBottom: '2rem'
                }}
                variant="contained"
                onClick={() => handleRefetch(true)}
            >
                Update
            </Button>

            {renderStories()}

            {displaySnackBars()}
        </div>
    )
}
