import { useEffect, useState } from "react";

import ApiClient from "../apiClient";

import type { NearestPostCodesResponse } from "../apiClient/types";
import NearestPostCodesView from "../components/NearestPostCodesView";
import type { PostCode } from "../types";

const client = new ApiClient();

function useNearestPostCodes(postcode: PostCode) {
  const [postCodeInfo, setPostCodeInfo] = useState<null|NearestPostCodesResponse>(null);
  useEffect(() => {
    (async () => {
      const result = await client.nearest(postcode);
      setPostCodeInfo(result);
    })();
  }, [postcode.value]);

  return postCodeInfo;
}

export default function NearestPostCodesContainer({ postcode }: { postcode: PostCode }) {
  const data = useNearestPostCodes(postcode);
  return <NearestPostCodesView data={data} />;
}