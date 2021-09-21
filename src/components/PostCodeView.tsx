import { Link } from "react-router-dom";
import type { PostCodeResponse } from "../apiClient/types";
import type { PostCode, SinglePostcodeInfo } from "../types";

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
    <p>Region: {data.postcode.region}</p>
    <p>Country: {data.postcode.country}</p>
    <h3>Nearby</h3>
    <ul>
    {
      data.nearby.map(pc => <NearbyPostCode key={pc.postcode} {...pc} />)
    }
    </ul>
  </div>
}

function NearbyPostCode(postcode: SinglePostcodeInfo) {
  return (
    <li><Link to={`/postcode/${postcode.postcode}/`}>{postcode.postcode}</Link>
      <ul>
        <li>Region: {postcode.region}</li>
        <li>Country: {postcode.country}</li>
      </ul>
    </li>
  )
}