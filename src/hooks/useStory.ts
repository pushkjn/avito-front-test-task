import { useEffect, useState } from "react"
import { api } from "../services/api"
import { Story } from "../type"

export const useStory = (id: number) => {
    const [story, setStory] = useState<Story>(null)
    const [loading, setLoading] = useState(false)
    const [requestError, setRequestError] = useState(false)

    useEffect(() => {

        const loadStory = async () => {
            setLoading(true)

            try {
                console.log('here');
                
                const story = await api.hackerNewsService.getStoryById(id)
                console.log(story);
                
                setStory(story)
            } 

            catch (error) {
                console.log(error);
                
                setRequestError(true)
            }

            finally {
                setLoading(false)
            }
        }

        loadStory()
    }, [])

    return {story, loading, requestError}
}