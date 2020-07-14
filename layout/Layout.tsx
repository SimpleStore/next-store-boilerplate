import Header from "./Header";
import Footer from "./Footer";

export default ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};
