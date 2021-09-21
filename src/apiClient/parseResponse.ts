import type { PostCodeResponse } from "./types"
import type { SinglePostcodeInfo } from "../types";
import { isSinglePostCodeInfo } from "../types";

export default function parseResponse(postcodeJSON: any): PostCodeResponse {
    const postCodeList = postcodeJSON?.result;
    if (!isPostCodeList(postCodeList) || postCodeList.length < 1) {
        return {"error": true, message: "Invalid postcode data received"};
    }
    return {
        error: false,
        info: {
            postcode: removeUnwantedFields(postCodeList[0]),
            nearby: postCodeList.slice(1).map(removeUnwantedFields)
        }
    }
}

function removeUnwantedFields(pc: SinglePostcodeInfo): SinglePostcodeInfo {
    return {
        postcode: pc.postcode,
        region: pc.region,
        country: pc.country
    };
}

function isPostCodeList(postCodeList: any): postCodeList is SinglePostcodeInfo[] {
    if (!Array.isArray(postCodeList)) {
        return false;
    }
    for (const item of postCodeList) {
        if (!isSinglePostCodeInfo(item)) {
            return false;
        }
    }
    return true;
}