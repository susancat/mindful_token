import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import styles from '../styles/SubmitPage.module.css';
import { Row, Col, Card } from 'react-bootstrap';

import { getAccount, fetchMintpassContract } from '../store/actions';
import axios from 'axios';

export default function Mintpass() {
    const [mpBalance, setMpBalance] = useState(0);
    const [nfts, setNfts] = useState([]);

    const dispatch = useDispatch();
    const account = useSelector((state) => state.accountState);
    const mintpassContract = useSelector((state) => state.contractState);

    useEffect( async() => {
      await dispatch(getAccount());
      await dispatch(fetchMintpassContract());
      await checkHoldedNFT();
    }, [dispatch])

    async function checkHoldedNFT() {
        const balance = await mintpassContract.methods.balanceOf(account).call({ from: account })
        // setMpBalance(balance);
        console.log(balance)
        // await loadNFTs();
        const tokenArr = Array.apply(null, Array(balance)).map(function (x, i) { return i; });
        let items = [];
        for(let i = 0; i < balance; i++) {
          // await Promise.all(tokenArr.map(async i => {
          const tokenId = await mintpassContract.methods.tokenOfOwnerByIndex(account, i).call({ from: account })
          let tokenUri = await mintpassContract.methods.tokenURI(tokenId).call({ from: account })
          tokenUri = `https://ipfs.io/ipfs/${tokenUri.split("ipfs://")[1]}`;
          const meta = await axios.get(tokenUri).then(res => { return res.data})
          let item = {
            tokenId: tokenId,
            name: meta.name,
            description: meta.description,
            image: `https://gateway.pinata.cloud/ipfs/${meta.image.split("ipfs://")[1]}`
          }

          items.push(item)
          }
          // ))
          setNfts(items)
          console.log(nfts.length)
    }

    return(
        <div className={styles.submitPage}>
          {/* <Button onClick={update}>Update</Button> */}
          <Row><Link href="/"><h6 style={{cursor: "pointer"}}>&larr; Return to homepage</h6></Link></Row>
          <Row className='mb-5'>
            {
            nfts.map((nft, i) => (
              <Col xs={4} md={3} key={i}>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top"age src={nft.image} className="rounded" />
                <Card.Body>
                  <Card.Title>#{nft.tokenId} {nft.name}</Card.Title>
                  <Card.Text>
                    {nft.description}
                  </Card.Text>
                </Card.Body>
                </Card>
              </Col>
            ))
          }
          </Row>
        </div>
    )
}  