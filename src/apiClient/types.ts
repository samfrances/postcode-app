import type { PostCodeInfo } from "../types";

export interface ResponseError {
  error: true,
  message: string
}

type ResponseSuccess<T> = { error: false } & T

export type PostCodeAPIResponse<T> = ResponseError | ResponseSuccess<T>;

export type PostCodeInfoResponse = PostCodeAPIResponse<{ info: PostCodeInfo }>
export type NearestPostCodesResponse = PostCodeAPIResponse<{ nearest: PostCodeInfo[] }>