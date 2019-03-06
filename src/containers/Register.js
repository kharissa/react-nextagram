import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import Loader from '../components/Loader'

export default class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        show: true,
        validated: false,
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        signUpMessage: '',
        isLoading: false,
    };
  }

    handleClose = () => {
        this.props.onHide();
    }

    handleFormSwitch = () => {
        this.props.onHide();
        this.props.isLogin();
    }


    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleValidation = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        this.setState({
            validated: true,
            isLoading: true
        });      

        axios({
            // POST registration information
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/new',
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
        })
        .then(response => {

            // On success, display success message, close Register modal and open Login modal
            this.setState({
                signUpMessage: 'You have successfully registered with us! Please proceed to login.',
                isLoading: false
            });

            window.alert(this.state.signUpMessage);

            this.props.onHide();
            this.props.isLogin();
            
        })
        .catch(error => {

            // On failure, display failed message and keep Register modal open
            console.log(error);
            const message = error.response.data.message;
            message.join(", ");
            this.setState({
                isLoading: false,
                signUpMessage: 'There was an error with your registration:\n' + message
            })
            window.alert(this.state.signUpMessage);
        })
        
    }

    handleSubmit = (event) => {
        event.preventDefault();
        (this.state.password !== this.state.confirmPassword) ?
        window.alert("Passwords Don't Match"): this.handleValidation(event);
    }

  render() {
      const { validated } = this.state;

      return(
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register for an Account</Modal.Title>
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
                        <Form.Group as={Col} md="6" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                value={this.state.username} onChange={this.handleInput}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleInput} required />
                            <Form.Control.Feedback type="invalid">
                            Please provide a valid email address.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                    <Form.Group as={Col} md="6" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} required />
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control  type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleInput} required />
                        <Form.Control.Feedback type="invalid">
                        Please make sure your password matches.
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row>
                    <Form.Group>
                      <OverlayTrigger
                        delay={{ show: 0, hide: 0 }}
                        placement="top"
                        overlay={
                            <Popover
                            title={`Site Purpose`}
                            >
                            Currently you can login, register, and view photos.
                            </Popover>
                            }
                        >
                            <Form.Check
                            required
                            label="I understand this is a test site."
                            feedback="You must agree before submitting."
                            onClick={this.popup}
                            />
                        </OverlayTrigger>
                    </Form.Group>
                </Form>
            </Modal.Body>
        }
        <Modal.Footer>
          <Button className="btn-login" onClick={this.handleFormSwitch}>
            Login
          </Button>
          <Button className="btn-nextagram" type="submit" onClick={this.handleSubmit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>

    )
  }
}
