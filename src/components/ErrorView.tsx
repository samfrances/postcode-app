import { ResponseError } from "../apiClient/types";

type Props = Pick<ResponseError, "message"> & {headingLevel?: 1|2|3|4|5}

function Header(level: 1|2|3|4|5): "h1"|"h2"|"h3"|"h4"|"h5" {
    return `h${level}`;
}

export default function ErrorView({ message, headingLevel=3 }: Props) {
  const Tag = Header(headingLevel);
  return <Tag>Error: {message}</Tag>;
}