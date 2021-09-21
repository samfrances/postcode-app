import "whatwg-fetch"

import parseResponse from "./parseResponse";

import type { PostCode } from "../types";
import type { PostCodeResponse } from "./types";

const BASE_URL = "https://api.postcodes.io/postcodes"

type HttpClient = typeof fetch

export default class PostcodeClient {
    constructor(
        private doRequest: HttpClient = fetch.bind(window),
        private readonly baseURL = BASE_URL,
    ) {}

    async getPostCodeInfo(postcode: PostCode): Promise<PostCodeResponse> {
        const genericErrorMessage = "Error requesting postcode info";
        try {
            const postcodeReq = await this.doRequest(`${this.baseURL}/${postcode.toString()}/nearest/`);
            if (postcodeReq.status === 404) {
                return { error: true, message: "Postcode not found" };
            }
            if (postcodeReq.status !== 200) {
                // TODO: deal with more status codes
                return { error: true, message: genericErrorMessage }
            }
            try {
                const postcodeData = await postcodeReq.json();
                return parseResponse(postcodeData);
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

