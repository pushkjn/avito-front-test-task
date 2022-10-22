import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Story, Comment } from '../type'

export const storiesApi = createApi({
    reducerPath: 'storiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0' }),
    endpoints: (builder) => ({
        getLatest: builder.query<number[], void>({
            query: () => '/newstories.json'
        }),
        getStoryById: builder.query<Story, number>({
            query: (id) => `/item/${id}.json`
        }),
        getCommentById: builder.query<Comment, number>({
            query: (id) => `/item/${id}.json`
        })
    }),
})

export const { useGetStoryByIdQuery, useGetCommentByIdQuery, useLazyGetLatestQuery } = storiesApi