import { Alert, Button, CircularProgress, Skeleton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StoryCard } from "../../components/storyCard";
import { useInterval } from "../../hooks/useInterval";
import { useGetStoriesQuery, useLazyGetLatestQuery } from "../../store/api";
import { STORIES_AMOUNT, UPDATE_NEWS_INTERVAL } from "./config";

export const Main: React.FC = () => {
    const [getLatestStories, latestStoriesResponce] = useLazyGetLatestQuery()
    const [upToDate, setUpToDate] = useState(false)
    const { data: stories, isLoading: storiesLoading, error: getStoriesError } = useGetStoriesQuery(latestStoriesResponce.data?.slice(0, STORIES_AMOUNT), { skip: !latestStoriesResponce.data })

    useEffect(() => {
        getLatestStories()
    }, [])

    useInterval(() => getLatestStories(), UPDATE_NEWS_INTERVAL)

    const handleRefetch = async (showMessage?: boolean) => {
        const oldFirst = latestStoriesResponce.data[0]

        const responce = await getLatestStories()

        if (!showMessage)
            return

        if (responce.data[0] == oldFirst)
            setUpToDate(true)
    }

    const renderStories = () => {
        if (!stories || !latestStoriesResponce.data || storiesLoading)
            return Array(STORIES_AMOUNT / 2).fill(null).map(() => (
                <Skeleton
                    sx={{
                        height: '5rem'
                    }}
                />
            ))

        const indexIsEven = (idx: number) => idx % 2 === 0

        return (
            [...stories]
                .sort((a, b) => a.time - b.time)
                .map((story, idx) => (
                    <StoryCard story={story} key={story.id} colored={indexIsEven(idx)} />
                ))
        )
    }

    const displayLoading = () => {
        if ((latestStoriesResponce.isLoading) || (latestStoriesResponce.isFetching))
            return <CircularProgress sx={{ margin: '0 auto 1rem', display: 'block' }} />
    }

    const displaySnackBars = () => (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean((latestStoriesResponce.error || getStoriesError))}
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

            {displayLoading()}

            {renderStories()}

            {displaySnackBars()}
        </div>
    )
}
