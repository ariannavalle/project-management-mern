import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import ProjectList from './components/projects/ProjectList';
import ProjectDetails from './components/projects/ProjectDetails'
import TaskDetails from './components/tasks/TaskDetails';
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Switch>
          <Route exact path="/projects" component={ProjectList}/>
          <Route exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} /> 
        </Switch>
    </div>
  );
}

export default App;
