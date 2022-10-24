import Button from "@mui/material/Button/Button";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import Box from "@mui/material/Box";
import React, { useState } from "react"
import { useGetCommentsByIdQuery } from "../../store/api"

export type CommentProps = {
    id: number
    level?: number
}

export const CommentCard: React.FC<CommentProps> = props => {
    const { data, isLoading } = useGetCommentsByIdQuery(props.id)
    const [opened, setOpened] = useState(false)

    const offset = (props.level ? props.level : 0) * 30

    if (isLoading)
        return (
            <Skeleton
                sx={{
                    marginLeft: `${offset}px`,
                    height: '2rem'
                }}
            />
        )

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
            paddingLeft: `${offset}px`
        }}
        >
            <h3>
                {data.by}
            </h3>
            <div
                dangerouslySetInnerHTML={{ __html: data.text }}
            />

            {data.kids && (
                <Button
                    onClick={() => setOpened(!opened)}
                    variant="outlined"
                >
                    {opened ? 'Hide' : 'Show'} child comments
                </Button>
            )}

            {opened && renderChildComments(data.kids)}
        </Box>
    )
}