import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { Story, Comment } from '../type'

export const storiesApi = createApi({
    reducerPath: 'storiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0' }),
    endpoints: (builder) => ({
        getStoryById: builder.query<Story, number>({
            query: (id) => `/item/${id}.json`
        }),
        getCommentsById: builder.query<Comment, number>({
            query: (id) => `/item/${id}.json`
        }),
        getStories: builder.query<Story[], number>({
            async queryFn(storiesAmount, _queryApi, _extraOptions, fetchWithBQ) {

                const ids = await fetchWithBQ('/newstories.json')
                if (ids.error)
                    return { error: ids.error as FetchBaseQueryError }

                const requests = (ids.data as number[]).slice(0, storiesAmount).map(id => fetchWithBQ(`/item/${id}.json`))

                const stories = (await Promise.all(requests)).map(el => el.data as Story)

                return { data: stories.filter(story => story !== null) }
            }
        })
    }),
})

export const { useGetCommentsByIdQuery, useGetStoryByIdQuery, useGetStoriesQuery, useLazyGetStoriesQuery } = storiesApi