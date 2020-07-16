import { IntlProvider } from "react-intl";
import { CookiesProvider } from "react-cookie";
import "../styles/index.css";
import Layout from "../layout/Layout";
import { WebsiteProvider } from "../store/WebsiteContext";

function MyApp({ Component, pageProps }) {
  return (
    <IntlProvider locale="en-AU">
      <CookiesProvider>
        <WebsiteProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WebsiteProvider>
      </CookiesProvider>
    </IntlProvider>
  );
}

export default MyApp;
