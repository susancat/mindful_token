import { SessionProvider } from 'next-auth/react';
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import '../styles/globals.css';

/*
  SSRProvider and Web3ReactProvider moved to respective layout since they don't work here
*/ 
function MyApp({ Component, pageProps }){
//single shared layout vs. per-page layout:https://nextjs.org/docs/basic-features/layouts
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
    )
}

export default wrapper.withRedux(MyApp);