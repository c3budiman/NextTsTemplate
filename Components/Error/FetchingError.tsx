import { Result } from "antd";

type FetchingErrorProps = {
  // eslint-disable-next-line react/require-default-props
  message?: string;
};
function FetchingError({ message }: FetchingErrorProps) {
  return <Result status="500" title="500" subTitle={message ?? "Sorry, something went wrong."} />;
}
export default FetchingError;
