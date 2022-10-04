import Head from "next/head";
import {SSRProvider} from '@react-aria/ssr';

//the app has two types of layout, this page cited by pages which don't include Nav and footer
const SubpageLayout = ({children}) => {
    return (
        <SSRProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {/* <main> */}
                {children}
            {/* </main> */}
        </SSRProvider>
    )
}

export default SubpageLayout;