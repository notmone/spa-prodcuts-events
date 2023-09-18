// import classes from "./PageContent.module.css";

function PageContent({ title, children }) {
  return (
    <main>
      <h1>{title}</h1>
      {children}
    </main>
  );
}

export default PageContent;
