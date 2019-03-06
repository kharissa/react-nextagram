import React from 'react'
import Image from 'react-graceful-image'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Loader from '../components/Loader'
import Placeholder from '../images/profile-placeholder.jpg'

export default class UserProfilePage extends React.PureComponent {
  state = {
    userId: null,
    userName: null,
    userProfilePhoto: null,
    userImages: [],
    isLoading: true
  }

  componentDidMount() {
    const userId = this.props.match.params.id;

    axios.get('https://insta.nextacademy.com/api/v1/users/')
        .then(users => {
            // If successful, load users array with profile data
            for (let user of users.data) {
                if (user.id === parseInt(userId)) {
                    this.setState({
                        userId: userId,
                        userName: user.username,
                        userProfilePhoto: user.profileImage
                    })
                }
            }
        })
        .then(
            axios.get('https://insta.nextacademy.com/api/v1/images?userId=' + userId)
            .then(photos => {
                this.setState({
                    userImages: photos.data,
                    isLoading: false
                })
            })
        )
        .catch(error => {
            // If unsuccessful, console log error
            console.log('ERROR: ', error)
        })
    }

  render() {
    const {
        userName,
        userProfilePhoto,
        userImages,
        isLoading
    } = this.state;

    return (
        <Container className="p-4" fluid>
            <Row className="my-5">
                <Col sm={3}>
                    <Image src={userProfilePhoto ? userProfilePhoto : Placeholder} className="profile-image" alt={`Profile photo of ${userName}`} />
                </Col>
                <Col>
                    <h2 className="mt-3">@{userName}</h2>
                </Col>
            </Row>
            <Row>
                {
                    isLoading ? 
                        <Loader size={200}/>
                    : userImages.map((image, index) =>
                        <Col sm={4} className="mb-2" key={index}>
                            <Image src={image} className="user-images" key={index} alt={`Image from ${userName}`} />
                        </Col>
                    )
                }
            </Row>
        </Container>
    )
  }
}