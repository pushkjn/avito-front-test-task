export type Story = {
    id: number
    by: string
    descendants: number
    time: number
    /* 
    text?:  */
    title: string
    type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
    url: string
    kids?: number[]
    score: number
}

export type Comment = {
    by: string
    id: number
    parent: number
    text: string
    time: number
    type: "comment"
    kids: number[]
}