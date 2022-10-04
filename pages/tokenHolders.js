import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import styles from '../styles/SubmitPage.module.css';
import { Row } from 'react-bootstrap';

import { getAccount, fetchMintpassContract } from '../store/actions';

export default function TokenHolders() {
    const [owners, setOwners] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();
    const account = useSelector((state) => state.accountState);
    const mintpassContract = useSelector((state) => state.contractState);

    useEffect(async() => {
      await dispatch(getAccount());
      await dispatch(fetchMintpassContract());
      await checkOwnership();
      setIsLoaded(true);//when has this, refresh successfully
    },[dispatch])

    async function checkOwnership() {
      const tokenNumbers = await mintpassContract.methods.totalSupply().call({ from: account });
      for (let i = 0; i < tokenNumbers; i++) {
          let owner = await mintpassContract.methods.ownerOf(i).call({ from: account });
          // let owners = [...owners, owner];
          await owners.push(owner);//if no await, the page won't load the address
          setOwners(owners);
      }
    }

    return(
        <div className={styles.submitPage}>
          {/* <Button onClick={update}>Update</Button> */}
          <Row><Link href="/"><h6 style={{cursor: "pointer"}}>&larr; Return to homepage</h6></Link></Row>
          {
            isLoaded ?
            <Row className='mb-5'>
            {
            owners.map((owner, i) => (
                <h4 key={i}>token ID {i} : {owner}</h4>
            ))
          }
            </Row>
            :    
            <h4>Loading...</h4>
          }
        </div>
    )
}  