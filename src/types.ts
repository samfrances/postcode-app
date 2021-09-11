

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