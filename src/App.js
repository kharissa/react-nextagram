import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import MyProfilePage from './pages/MyProfilePage'
import Navbar from './containers/Navbar'
import Axios from 'axios'

class App extends React.Component {

  state = {
    users: [],
  }

  componentDidMount(){
    // GET request to Nextagram API
    Axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
      // If successful, load users array with profile data
      this.setState({
        users: result.data
      })
    })
    .catch(error => {
        // If unsuccessful, console log error
        console.log('ERROR: ', error)
      })
  }

  render(){
    const { users } = this.state;
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={(props) => <HomePage users={users}/>} />
          <Route path="/users/:id" component={UserProfilePage} />
          <Route exact path="/profile" component={MyProfilePage} />
        </Switch>
      </>
    )
  }
}

export default App;
