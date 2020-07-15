import { IntlProvider } from "react-intl";
import "../styles/index.css";
import Layout from "../layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <IntlProvider locale="en-AU">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </IntlProvider>
  );
}

export default MyApp;
