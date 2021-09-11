

declare const PostCodeType: unique symbol;

export class PostCode {
  [PostCodeType]: void;
  readonly value: string;
  private constructor(value: string) {
    // TODO: validation
    this.value = value;
  }

  static create(value: string) {
    return new PostCode(value);
  }

  toString() {
      return this.value;
  }

}

export interface PostCodeInfo {
    postcode: SinglePostcodeInfo,
    nearby: SinglePostcodeInfo[]
}

export interface SinglePostcodeInfo {
    postcode: string,
    country: string,
    region: string,
}

export function isSinglePostCodeInfo(postcodeJSON: any): postcodeJSON is SinglePostcodeInfo {
    const postcode = postcodeJSON?.postcode;
    const region = postcodeJSON?.region;
    const country = postcodeJSON?.region;
    return (
        typeof postcode == "string" &&
        typeof region == "string" &&
        typeof country == "string"
    )
}