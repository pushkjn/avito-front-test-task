import { HackerNewsService } from "./HackerNewsService";

export class Api {
    hackerNewsService: HackerNewsService

    constructor () {
        this.hackerNewsService = new HackerNewsService()
    }
}

export const api = new Api()