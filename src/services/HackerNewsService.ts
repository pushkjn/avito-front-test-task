import { Story } from "../type"

export class HackerNewsService {
    private apiUrl = 'https://hacker-news.firebaseio.com/v0'

    getLatestNews(): Promise<number[]> {
        return (
            fetch(this.apiUrl + '/newstories.json')
                .then(res => res.json())
        )
    }

    getStoryById(id: number): Promise<Story> {
        console.log(id, 'id')
        return (
            fetch(`${this.apiUrl}/item/${id}.json`)
                .then(res => {
                    console.log(res);
                    return res.json()
                    
                })
        )
    }
}