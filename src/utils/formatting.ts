export const formatSecondsToDateString = (utcSeconds: number) => {
    const date = new Date(0)

    date.setUTCSeconds(utcSeconds)

    return date.toLocaleString()
}