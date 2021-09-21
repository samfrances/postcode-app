import type { PostCodeInfoResponse } from "../apiClient/types";
import ErrorView from "./ErrorView";
import Loading from "./LoadingView";

interface Props {
  data: PostCodeInfoResponse|null;
}

export default function PostCodeInfoView({ data }: Props) {

  const datadisplay =
    data == null ? <Loading />
    : data.error ? <ErrorView message={data.message} />
    : <DataDisplay data={data.info} />;

  return datadisplay;
}

type Success = Extract<PostCodeInfoResponse, {error: false}>
function DataDisplay({ data }: { data: Success["info"] }) {
  return <div>
    <h2>Postcode: {data.postcode}</h2>
    <p>Region: {data.region}</p>
    <p>Country: {data.country}</p>
  </div>
}
