import "whatwg-fetch"

type HttpClient = typeof fetch

export default class PostcodeClient {
    constructor(private doRequest: HttpClient) {}
}