

const PostCodeType = Symbol();

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
  postcode: string,
  country: string,
  region: string,
}

export function isPostCodeInfo(postcodeJSON: any): postcodeJSON is PostCodeInfo {
  const postcode = postcodeJSON?.postcode;
  const region = postcodeJSON?.region;
  const country = postcodeJSON?.region;
  return (
    typeof postcode == "string" &&
    typeof region == "string" &&
    typeof country == "string"
  );
}