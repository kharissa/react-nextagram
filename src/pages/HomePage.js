import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-graceful-image'
import Button from 'react-bootstrap/Button'
import UserImages from '../containers/UserImages'
import { Link } from 'react-router-dom'

export default class HomePage extends React.Component {

  render(){
    const users = this.props.users;

    return (
      <Container className="mt-5" fluid>
            {
                users.map(user =>
                  <Row className="rounded pt-3 pb-3 user-background" key={user.id}>
                      <Col sm={2} className="mb-4">
                          <Image src={user.profileImage} className="profile-image mt-2 mb-4" alt="" /><br />
                          <Link to={`/users/${user.id}`} className="font-weight-bold username"><Button className="btn-nextagram btn-block" style={{fontWeight:500}}>@{user.username}</Button></Link>
                      </Col>
                      <Col>
                          <UserImages userId={user.id}/>
                      </Col>
                  </Row>
                )
              }
      </Container>
    )
  }
}