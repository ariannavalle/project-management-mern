import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/navbar/Navbar'
import ProjectList from './components/projects/ProjectList';
import ProjectDetails from './components/projects/ProjectDetails'
import TaskDetails from './components/tasks/TaskDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AuthService from './components/auth/auth.service';
import ProtectedRoute from './components/auth/protected-route';

class App extends Component {

  state = { loggedInUser: null }

  service = new AuthService()

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    { this.fetchUser() }
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={ProjectList} />
            <ProtectedRoute exact path="/projects/:id/tasks/:taskId" component={TaskDetails} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
            <Route exact path='/' render={() => <Login getUser={this.getTheUser} />} />
            <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={ProjectList} />
            <ProtectedRoute exact path="/projects/:id/tasks/:taskId" component={TaskDetails} />
          </Switch>
        </div>
      );
    }
  }
}
export default App;