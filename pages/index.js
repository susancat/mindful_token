import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import homeStyles from '../styles/Home.module.css';
import Layout from '../components/IndexPageLayout';
import Head from '../components/homepage/Head';
// import Intro from '../components/homepage/Intro';
// import Gallery from '../components/homepage/Gallery';
// import Donate from '../components/homepage/Donate';
// import Draw from '../components/homepage/Draw';
// import Redeem from '../components/homepage/Redeem';
// import Team from '../components/homepage/Team';
// import Mintpass from '../components/homepage/Mintpass';

const Intro = dynamic(() => import('../components/homepage/Intro'))

const Gallery = dynamic(() => import('../components/homepage/Gallery'))

const Donate = dynamic(() => import('../components/homepage/Donate'))

const Draw = dynamic(() => import('../components/homepage/Draw'))

const Redeem = dynamic(() => import('../components/homepage/Redeem'))

const Team = dynamic(() => import('../components/homepage/Team'))

const Mintpass = dynamic(() => import('../components/homepage/Mintpass'))
export default function Home() {
  return(
    <div className={homeStyles.main}>
      <Head />
      <Suspense fallback={
        <div>
          <h1>Loading...</h1>
        </div>
      }>
        <Intro />
        <Gallery />
        <Draw />
        <Mintpass />
        <Donate />
        <Redeem />
        <Team />
      </Suspense>
    </div>
  )
}

//per-page layout
Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}