import Image from 'next/image';
import { Container, Navbar, Nav, Form, Button, Dropdown, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import styles from '../styles/Nav.module.css';
import homeStyles from '../styles/Home.module.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, getBalance, grabAccount, grabBalance, disconnectAccount } from '../store/actions';

const NavBar = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const balance = useSelector((state) => state.balanceState);

  useEffect(() => {
    dispatch(getAccount());
    dispatch(getBalance());
    window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(getAccount());
        dispatch(getBalance());
      });
  },[dispatch])

  const connect = async() => {
    await dispatch(grabAccount());
    await dispatch(grabBalance());
  }
  
//didn't work
  const disconnect = async() => {
    dispatch(disconnectAccount());
  }
    return (
    <Navbar collapseOnSelect fixed="top" expand='xl' className={`p-3 ${styles.bg}`}>
    <Container fluid className={styles.container}>
    <Navbar.Brand href="/">
        <Image
            src='/logo.svg'
            width="110"
            height="30"
            className="d-inline-block align-top"
            alt="mindful ocean logo"
        />
    </Navbar.Brand>       
    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    <Navbar.Collapse id='responsive-navbar-nav'>
    <Nav className="me-auto">
        <Nav.Link href="#about" className={styles.navlink}>About</Nav.Link>
        <Nav.Link href="#gallery" className={styles.navlink}>Gallery</Nav.Link>
        <Nav.Link href="#mobileapp" className={styles.navlink}>Create</Nav.Link>
        <Nav.Link href="#mintpass" className={styles.navlink}>Mintpass</Nav.Link>
        <Nav.Link href="#donate" className={styles.navlink}>Donate</Nav.Link>
        <Nav.Link href="#mindfultoken" className={`text-nowrap ${styles.navlink}`}>Mindful Token</Nav.Link>
    </Nav>
    <Nav>
      <Col lg={3} xl={4} className='mt-1 me-1'>
          <Form>
              <InputGroup className="">
                  <InputGroup.Text style={{color: '#005D6C', border: '1px solid #005D6C', backgroundColor: 'none'}} id="subscribe" type="submit"><i className="far fa-envelope"></i></InputGroup.Text>
                  <FormControl id="subscribe" placeholder="Subscribe here" style={{border: '1px solid #005D6C'}} />
              </InputGroup>
          </Form>
      </Col>
      <Col lg={3} xl={4} className='mt-1 me-1'>
          <Dropdown className="">
              <Dropdown.Toggle className={styles.dropdownBtn} id="language">
                  ENG&nbsp;&nbsp;&nbsp;
              </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item href="#/lg-1">ENG</Dropdown.Item>
                  <Dropdown.Item href="#/lg-2">CN</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
      </Col>
      <Col lg={4} className='mt-1 ms-2'>
          {(account) ?
              <Dropdown className="">
                  <Dropdown.Toggle className={styles.dropdownBtn} id="connect">
                      {account.slice(0,5).concat('...').concat(account.slice(-4))}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item href="#/balance">{balance} MATIC</Dropdown.Item>
                      <Dropdown.Item href="#/disconnect" onClick={disconnect}>Disconnect</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown> :
              <Button onClick={connect} className={homeStyles.btn} style={{borderRadius: '15px'}}><Image src="/metamask.png" width="15px" height="15px" alt="metamask icon" />&nbsp;Connect wallet</Button> 
          }  
      </Col>
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>
    )
}

export default NavBar;