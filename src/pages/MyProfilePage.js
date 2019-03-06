import React from 'react'
import Image from 'react-graceful-image'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Loader from '../components/Loader'
import { Redirect } from 'react-router-dom'
import Placeholder from '../images/profile-placeholder.jpg'


export default class MyProfilePage extends React.PureComponent {
    state = {
        userImages: [],
        loggedIn: true,
        isLoading: true,
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        token ?
        // GET request to obtain all images for current logged in user
        // Requires Authorization bearer token to obtain current user
        axios({
            method: 'get',
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // Returns array of image urls strings for logged in user
            console.log('Success');
            console.log(response.data);

            this.setStatus({
                userImages: response.data,
                isLoading: false,
            })
        })
        .catch(error => {
            // On failure, display error
            console.log(error);
            this.setState({
                isLoading: false,
            })
        })
        :
        this.setState({
            loggedIn: false,
            isLoading: false,
        })
    }

    handleRedirect() {
        if (this.state.loggedIn === false) {
            window.alert('Please login to access your profile.')
            return <Redirect to="/" />
        }
    }

    render() {
        const username = localStorage.getItem('username');
        const userPhoto = localStorage.getItem('userPhoto');
        const isLoading = this.state.isLoading;
        const userImages = this.state.userImages;

    return (
        <Container className="p-4" fluid>
            <Row className="my-5">
                <Col sm={3}>
                    <Image src={userPhoto ? userPhoto : Placeholder} className="profile-image" alt={`Profile photo of ${username}`} />
                </Col>
                <Col>
                    <h2 className="mt-3">@{username}</h2>
                </Col>
            </Row>
            <Row>
                {
                    isLoading ? 
                        <Loader size={200}/>
                    : userImages.map(image =>
                        <Col sm={4} className="mb-2">
                            <Image src={image} className="user-images" alt={`Image from ${username}`} />
                        </Col>
                    )
                }
            </Row>
            {this.handleRedirect()}
        </Container>
    )
  }
}