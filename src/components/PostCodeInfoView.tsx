import type { PostCodeInfoResponse } from "../apiClient/types";

interface Props {
  data: PostCodeInfoResponse|null;
}

export default function PostCodeInfoView({ data }: Props) {

  const datadisplay =
    data == null ? <Loading />
    : data.error ? <ErrorDisplay message={data.message} />
    : <DataDisplay data={data.info} />;

  return datadisplay;
}

function Loading() {
  return <div>Loading</div>;
}

type ErrorResponse = Extract<PostCodeInfoResponse, {error: true}>
function ErrorDisplay({ message }: Pick<ErrorResponse, "message">) {
  return <h3>Error: {message}</h3>;
}

type Success = Extract<PostCodeInfoResponse, {error: false}>
function DataDisplay({ data }: { data: Success["info"] }) {
  return <div>
    <h2>Postcode: {data.postcode}</h2>
    <p>Region: {data.region}</p>
    <p>Country: {data.country}</p>
  </div>
}
