import { ResponseError } from "../apiClient/types";

export default function ErrorView({ message }: Pick<ResponseError, "message">) {
  return <h3>Error: {message}</h3>;
}