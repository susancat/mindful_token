import { Navbar, Container, Nav } from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar className="mt-5 p-4" style={{backgroundColor: '#005D6C'}}>
            <Container>
            <Nav className="me-auto">
                <Nav.Link href="/whitepaper" style={{color: '#fff'}}>White Paper</Nav.Link>
                <Nav.Link href="/privatepolicy" style={{color: '#fff'}}>Private Policy</Nav.Link>
                <Nav.Link href="/contactus" style={{color: '#fff'}}>Contact Us</Nav.Link>
            </Nav>
            {/* <p className="text-dark mt-2">Copyright © 2021 Dalton Learning Lab Limited. All rights reserved.</p> */}
            </Container>
        </Navbar>
    )
}
export default Footer;