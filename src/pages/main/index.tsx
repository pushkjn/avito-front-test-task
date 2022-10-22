import React, { useEffect } from "react";
import { StoryCard } from "../../components/storyCard";
import { useInterval } from "../../hooks/useInterval";
import { useStories } from "../../hooks/useStories";
import { useLazyGetLatestQuery } from "../../store/api";
import { STORIES_AMOUNT, UPDATE_NEWS_INTERVAL } from "./config";

export const Main: React.FC = () => {
    const [trigger, result, lastPromiseInfo] = useLazyGetLatestQuery()

    useEffect(() => {
        trigger()
    }, [])

    const handleRefetch = async () => {
        const oldFirst = result.data[0]

        const responce = await trigger()

        if (responce.data[0] == oldFirst)
            alert('Everything is up to date')
    }

    useInterval(() => trigger(), UPDATE_NEWS_INTERVAL)

    if (result.isLoading)
        return (
            <div>
                loading
            </div>
        )

    if (result.isFetching)
        return (
            <div>
                updating data
            </div>
        )

    return (
        <div>
            <button onClick={handleRefetch}>Update</button>
            {result.data?.slice(0, STORIES_AMOUNT).map(id => <StoryCard id={id} key={id} />)}
        </div>
    )
}
