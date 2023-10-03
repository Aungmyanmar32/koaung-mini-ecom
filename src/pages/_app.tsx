import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import Router from "next/router";
import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import { store } from "@/store";

//Route Events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
