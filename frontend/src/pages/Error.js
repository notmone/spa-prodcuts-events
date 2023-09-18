import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();

  let message = "something went wront";
  //console.log(data);
  let title = "an Error occured";
  console.log(error);
  if (error.status === 500) {
    //2-2 error
    // const data = JSON.parse(error.data);
    // console.log(error.data);
    //3 error
    const data = error.data;
    message = data.message;
  }

  if (error.status === 404) {
    title = "not found";
    message = "could not find source page";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};
export default ErrorPage;
