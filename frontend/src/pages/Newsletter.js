import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";

function NewsletterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  console.log(request);
  const data = await request.formData();
  console.log(data);
  const email = data.get("email");

  // send to backend newsletter server ...
  console.log("email", email);
  return { message: "Signup successful!" };
}
