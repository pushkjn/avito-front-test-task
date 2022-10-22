import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStory } from "../../hooks/useStory";
import { useGetStoryByIdQuery } from "../../store/api";
import { replaceNonDigits } from "../../utils/replaceNonDigits";
import { CommentCard } from "../../components/commentCard";

export type storyParams = {
    id: string
}

export const StoryPage: React.FC = () => {
    const { id } = useParams<storyParams>()

    const { data, isLoading } = useGetStoryByIdQuery(+replaceNonDigits(id))

    if (isLoading)
        return (
            <div>
                loading
            </div>
        )

    let date = new Date(0)

    date.setUTCSeconds(data.time)

    const renderComments = () => {
        if (!data.kids)
            return null

        return data.kids.map(commentId => <CommentCard key={commentId} id={commentId} />)
    }

    return (
        <div>
            <div>story: {data.title} </div>
            <div>
                autor: {data.by}
            </div>
            <div>
                date: {date.toDateString()} 
            </div>
            <div>
                comments: {data.descendants}
            </div>
            <div>
                {renderComments()}
            </div>
        </div>
    )
}