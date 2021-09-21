import { useEffect, useState } from "react";

import ApiClient from "../apiClient";

import type { PostCodeInfoResponse } from "../apiClient/types";
import PostCodeInfoView from "../components/PostCodeInfoView";
import type { PostCode } from "../types";

const client = new ApiClient();

function usePostCodeInfo(postcode: PostCode) {
  const [postCodeInfo, setPostCodeInfo] = useState<null|PostCodeInfoResponse>(null)
  useEffect(() => {
    (async () => {
      const result = await client.postCode(postcode);
      setPostCodeInfo(result);
    })()
  }, [postcode.value])

  return postCodeInfo;
}

export default function NearestPostCodesContainer({ postcode }: { postcode: PostCode }) {
    const data = usePostCodeInfo(postcode);
    return <PostCodeInfoView data={data} />;
}
