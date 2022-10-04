import { Row, Col, Image, Container, Card } from 'react-bootstrap';
import styles from '../../styles/Team.module.css';

const Team = () => {
    return (
      <div className={styles.team} >
          <h3 className={styles.title}>Our team</h3>
          <Container>
          <Row className={styles.teamRow}>
            <Col xs={12} md={6} lg={3}>
              <Card className={styles.card}>
                <Image src="https://via.placeholder.com/150" alt="member-1" roundedCircle fluid/>
                <Card.Body>
                  <Card.Title className='text-center'>Member 1</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card className={styles.card}>
                <Image src="https://via.placeholder.com/150" alt="member-2" roundedCircle fluid/>
                <Card.Body>
                  <Card.Title className='text-center'>Member 2</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card className={styles.card}>
                <Image src="https://via.placeholder.com/150" alt="member-3" roundedCircle fluid/>
                <Card.Body>
                  <Card.Title className='text-center'>Member 3</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={3}>
              <Card className={styles.card}>
                <Image src="https://via.placeholder.com/150" alt="member-4" roundedCircle fluid/>
                <Card.Body>
                  <Card.Title className='text-center'>Member 4</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default Team;