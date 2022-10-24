import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
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
        }),
        getStories: builder.query<Story[], number[]>({
            async queryFn(storiesIds, _queryApi, _extraOptions, fetchWithBQ) {
                const requests = storiesIds.map(id => fetchWithBQ(`/item/${id}.json`))

                const stories = (await Promise.all(requests)).map(el => el.data as Story)

                return { data: stories }
            }
        })
    }),
})

export const { useGetCommentByIdQuery, useLazyGetLatestQuery, useGetStoryByIdQuery, useLazyGetStoryByIdQuery, useGetStoriesQuery } = storiesApi