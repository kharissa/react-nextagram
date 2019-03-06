import React from 'react'
import '../App.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-graceful-image'
import axios from 'axios'
import Loader from '../components/Loader'

export default class UserImages extends React.Component {
  state = {
    userImages: [],
    isLoading: true,
    userId: null
  }

  componentDidMount() {
      const userId = this.props.userId;
    // GET request to Nextagram API
    axios.get('https://insta.nextacademy.com/api/v1/images?userId=' + userId)
    .then(result => {
      // If successful, load users array with profile data
      this.setState({
        userImages: result.data,
        isLoading: false,
        userId: userId
      })
    })
    .catch(error => {
      // If unsuccessful, console log error
      console.log('ERROR: ', error)
    })
  }

  render(){
    return (
        <Row>
            {
                this.state.isLoading ? 
                  <Loader size={200}/>
                : 
                this.state.userImages.map((image, index) =>
                  <Col sm={4} className="mb-2" key={index}>
                    <Image src={image} className="user-images" alt="" key={index} fluid/>
                  </Col>
                )
            }
        </Row>
    )
  }
}