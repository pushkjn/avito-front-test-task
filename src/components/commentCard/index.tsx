import { Box, Skeleton } from "@mui/material"
import React, { useState } from "react"
import { useGetCommentByIdQuery } from "../../store/api"

export type CommentProps = {
    id: number
    level?: number
}

export const CommentCard: React.FC<CommentProps> = props => {
    const { data, isLoading } = useGetCommentByIdQuery(props.id)
    const [opened, setOpened] = useState(false)

    if (isLoading)
        return <div>loading</div>

    const renderChildComments = (commentsIds: number[]) => {
        return (
            commentsIds.map(commentId => (
                <CommentCard
                    key={commentId}
                    id={commentId}
                    level={props.level ? props.level + 1 : 1}
                />
            ))
        )
    }

    return (
        <Box sx={{
            marginBottom: "1rem",
            paddingLeft: `${(props.level ? props.level : 0) * 30}px`
        }}
        > 
            <h3>
                {data.by}
            </h3>
            <div
                dangerouslySetInnerHTML={{ __html: data.text }}
            />
            {data.kids && <button onClick={() => setOpened(!opened)}>{opened ? 'Hide' : 'Show'} child comments</button>}
            
            {opened && renderChildComments(data.kids)}
        </Box>
    )
}