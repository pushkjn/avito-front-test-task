import { configureStore } from '@reduxjs/toolkit'
import { storiesApi } from './api'


export const store = configureStore({
    reducer: {
        [storiesApi.reducerPath]: storiesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storiesApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch