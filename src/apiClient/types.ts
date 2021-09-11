import type { PostCodeInfo } from "../types";

interface ResponseSuccess {
    error: false,
    info: PostCodeInfo
}

interface ResponseError {
    error: true,
    message: string
}

export type PostCodeResponse = ResponseSuccess | ResponseError
