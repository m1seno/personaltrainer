import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Page not found</h1>
      <p>{(error as { data?: string })?.data || "An unexpected error occurred."}</p>
    </div>
  );
}