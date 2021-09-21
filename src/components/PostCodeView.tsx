import type { PostCodeResponse } from "../apiClient/types";
import type { PostCode } from "../types";

interface Props {
  postcode: PostCode;
  data: PostCodeResponse|null;
}

export default function PostCodeView({ postcode, data }: Props) {

  const datadisplay =
    data == null ? <Loading />
    : data.error ? <ErrorDisplay message={data.message} />
    : <DataDisplay {...data.info} />;

  return (
    <div>
      <h2>Postcode {postcode.toString()}</h2>
      {datadisplay}
    </div>
  );
}

function Loading() {
  return <div>Loading</div>;
}

type ErrorResponse = Extract<PostCodeResponse, {error: true}>
function ErrorDisplay({ message }: Pick<ErrorResponse, "message">) {
  return <h3>Error: {message}</h3>;
}

type Success = Extract<PostCodeResponse, {error: false}>
function DataDisplay(data: Success["info"]) {
  return <div>
    {JSON.stringify(data)}
  </div>
}