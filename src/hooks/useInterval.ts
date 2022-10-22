import { useCallback, useEffect } from "react"

export const useInterval = (callback: () => void, delay: number) => {
    const memoCallback = useCallback(callback, [])

    useEffect(() => {
        const timer = setInterval(memoCallback, delay)
        return () => clearInterval(timer)
    }, [])
}