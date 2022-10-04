import Head from "next/head";
import NavBar from './Nav';
import Footer from './Footer';

import {SSRProvider} from '@react-aria/ssr';

// when call Layout, the parent can pass any "children" element as a prop
//this page has Nav and footer, cited by homepage
const Layout = ({children}) => {
    return (
        <SSRProvider>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <NavBar />
                {/* <main> */}
                    {children}
                {/* </main> */}
                <Footer />
        </SSRProvider>
    )
}

export default Layout;