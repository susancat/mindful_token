import {Row, Col, Form,InputGroup,FormControl, Button, Image, Container, Dropdown} from 'react-bootstrap';
import Script from 'next/script';
import Link from 'next/link';
import homeStyles from '../styles/Home.module.css';
import styles from '../styles/Gallery.module.css';

import Layout from '../components/SubpageLayout';
import { data } from '../data/data';
import GalleryModel from '../components/homepage/GalleryModel';

const GalleryPage = () => {
  return(
    <Container className='mt-5 mb-5' style={{}}>
      <Row className='ms-5' ><Link href="/">&larr; Return to homepage</Link></Row>
      <Row className='mt-5 ms-5'>
          <Col sm={12} md={6}>
            <h5>Gallery</h5>
            <p>Artworks by our community</p>
          </Col>
          <Col sm={12} md={6}>
            <Row className='mt-3 me-auto'>
              <Col sm={6} md={5}>
                <Dropdown className="">
                  <Dropdown.Toggle className={styles.dropdownBtn} id="types">
                      Whale&nbsp;&nbsp;&nbsp;
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item href="#/whale">Whale</Dropdown.Item>
                      <Dropdown.Item href="#/butterflyfish">Butterfly fish</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={6} md={6}>
              <Form>
                <InputGroup style={{width:'100%'}}>
                    <FormControl id="search by name" placeholder="Search by creator" style={{border: '1px solid #005D6C', borderRadius: '15px'}} />
                </InputGroup>
            </Form>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row className='mt-2'>
        {
            data.map((d, i) => (
              <Col xs={6} md={4} key={i} style={{position:'relative'}}>
                <GalleryModel metadata={d.metadata} image={d.image} index={data.indexOf(d)} />
                <Image src={d.image} className={styles.GalleryPageImages} />
              </Col>
            ))
          }    
        </Row>
        <Row className={styles.btnRow}>
              <Button href="/gallery" className={`${styles.btn} ${homeStyles.btn}`}>Shuffle</Button>
        </Row>
        <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" />
        <Script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js" />
    </Container>
  )
}

//per-page layout
GalleryPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default GalleryPage;