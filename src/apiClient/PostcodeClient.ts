import "whatwg-fetch"

import { parseNearest, parsePostCode } from "./parseResponses";

import type { PostCode } from "../types";
import type { NearestPostCodesResponse, PostCodeAPIResponse, PostCodeInfoResponse } from "./types";

const BASE_URL = "https://api.postcodes.io/postcodes"

type HttpClient = typeof fetch

export default class PostcodeClient {
    constructor(
        private doRequest: HttpClient = fetch.bind(window),
        private readonly baseURL = BASE_URL,
    ) {}

    async postCode(postcode: PostCode): Promise<PostCodeInfoResponse> {
        return await this.get(`${postcode.toString()}/`, parsePostCode);
    }

    async nearest(postcode: PostCode): Promise<NearestPostCodesResponse> {
        return await this.get(`${postcode.toString()}/nearest/`, parseNearest);
    }

    private async get<T>(path: string, parseResult: (json: any) => PostCodeAPIResponse<T>): Promise<PostCodeAPIResponse<T>> {
        const genericErrorMessage = "Error requesting postcode info";
        try {
            const postcodeReq = await this.doRequest(`${this.baseURL}/${path}`);
            if (postcodeReq.status === 404) {
                return { error: true, message: "Postcode not found" };
            }
            if (postcodeReq.status !== 200) {
                // TODO: deal with more status codes
                return { error: true, message: genericErrorMessage }
            }
            try {
                const postcodeData = await postcodeReq.json();
                return parseResult(postcodeData);
            } catch (e) {
                console.error(e);
                return { error: true, message: "Failed to parse JSON"};
            }
        } catch (e) {
            console.log(e)
            return {error: true, message: genericErrorMessage};
        }
    }
}

