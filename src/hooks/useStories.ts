import { useEffect, useState } from "react"
import { api } from "../services/api"
import { Story } from "../type"

export const useStories = (storiesAmount: number) => {
    const [storiesIds, setStoriesIds] = useState<number[]>([])
    const [requestError, setRequestError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [stories, setStories] = useState<Story[]>([])

    useEffect(() => {
        updateStoriesIds()
    }, [])

    useEffect(() => {
        setLoading(true)

        const requests = storiesIds
            .slice(0, storiesAmount)
            .map(id => api.hackerNewsService.getStoryById(id))

        Promise.all(requests)
            .then(res => setStories(res))
            .catch(err => setRequestError(true))
            .finally(() => setLoading(false))

    }, [storiesIds])

    const updateStoriesIds = async () => {
        setLoading(true)

        try {
            const newStories = await api.hackerNewsService.getLatestNews()
            setStoriesIds(newStories)
        }

        catch (error) {
            setRequestError(true)
        }

        finally {
            setLoading(false)
        }
    }

    return { loading, requestError, stories, updateStoriesIds }
}