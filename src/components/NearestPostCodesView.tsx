import { Link } from "react-router-dom";
import type { NearestPostCodesResponse } from "../apiClient/types";
import type { PostCodeInfo } from "../types";
import ErrorView from "./ErrorView";
import Loading from "./LoadingView";

interface Props {
  data: NearestPostCodesResponse|null;
}

export default function NearbyPostCodeView({ data }: Props) {

  const datadisplay =
    data == null ? <Loading />
    : data.error ? <ErrorView message={data.message} headingLevel={5} />
    : <DataDisplay data={data.nearest} />;

  return datadisplay;
}

type Success = Extract<NearestPostCodesResponse, {error: false}>
function DataDisplay({ data }: { data: Success["nearest"] }) {
  return <div>
    <h3>Nearby</h3>
    <ul>
    {
      data.map(pc => <NearbyPostCode key={pc.postcode} {...pc} />)
    }
    </ul>
  </div>
}

function NearbyPostCode(postcode: PostCodeInfo) {
  return (
    <li><Link to={`/postcode/${postcode.postcode}/`}>{postcode.postcode}</Link>
      <ul>
        <li>Region: {postcode.region}</li>
        <li>Country: {postcode.country}</li>
      </ul>
    </li>
  )
}