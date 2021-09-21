import type { NearestPostCodesResponse, PostCodeInfoResponse } from "./types"
import type { PostCodeInfo } from "../types";
import { isPostCodeInfo } from "../types";

export function parsePostCode(postcodeJSON: any): PostCodeInfoResponse {
  const postCode = postcodeJSON?.result;
  if (!isPostCodeInfo(postCode)) {
    return {"error": true, message: "Invalid postcode data received"};
  }
  return {
    error: false,
    info: removeUnwantedFields(postCode)
  }
}

export function parseNearest(postcodeJSON: any): NearestPostCodesResponse {
  const postCodeList = postcodeJSON?.result;
  if (!isPostCodeList(postCodeList)) {
    return {"error": true, message: "Invalid postcode data received"};
  }
  return {
    error: false,
    nearest: postCodeList.map(removeUnwantedFields)
  };
}

function removeUnwantedFields(pc: PostCodeInfo): PostCodeInfo {
  return {
    postcode: pc.postcode,
    region: pc.region,
    country: pc.country
  };
}

function isPostCodeList(postCodeList: any): postCodeList is PostCodeInfo[] {
  if (!Array.isArray(postCodeList)) {
    return false;
  }
  for (const item of postCodeList) {
    if (!isPostCodeInfo(item)) {
      return false;
    }
  }
  return true;
}