import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import Loader from '../components/Loader'

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        show: true,
        validated: false,
        email: '',
        password: '',
        loginMessage: '',
        isLoading: false
    };
  }

    handleClose = () => {
      this.props.onHide();
    }

    // Switch to Register form on button click

    handleFormSwitch = () => {
      this.props.onHide();
      this.props.isRegister();
    }


    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        // Prevent form from being submitted if fields do not pass validation
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        // Show status of validation fields
        this.setState({
            validated: true,
            isLoading: true,
        });

        // POST for login status and add to local storage on success
        axios({
          method: 'POST',
          url: 'https://insta.nextacademy.com/api/v1/login',
          data: {
              email: this.state.email,
              password: this.state.password,
          }
        })
        .then(response => {
          console.log(response.data);
          // Add JWT, userId and username to local storage
          localStorage.setItem('token', response.data['auth_token']);
          localStorage.setItem('userId', response.data.user['id']);
          localStorage.setItem('username', response.data.user['username']);
          localStorage.setItem('userPhoto', response.data.user['profile_picture']);
          
          this.setState({
              loginMessage: 'You have successfully signed in.',
              isLoading: false
          });

          window.alert(this.state.loginMessage);
          this.props.onHide();
        })
        .catch(error => {
            console.log(error);
  
            this.setState({
                loginMessage: 'Your username or password did not match with our records. Please try again.',
                isLoading: false,
            })
            window.alert(this.state.loginMessage);
          })
      }

  render() {
      const { validated } = this.state;
      return(
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        {
          this.state.isLoading ?
          <Row className="mx-auto">
              <Loader width={150}/>
          </Row>
          :
          <Modal.Body>
              <Form
                  noValidate
                  validated={validated}
                  onSubmit={this.handleSubmit}
              >
                <Form.Row>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleInput} required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} required />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
                </Form.Row>
              </Form>
          </Modal.Body>
        }
        <Modal.Footer>
          <Button className="btn-login" onClick={this.handleFormSwitch}>
            Register
          </Button>
          <Button className="btn-nextagram" type="submit" onClick={this.handleSubmit}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

    )
  }
}
