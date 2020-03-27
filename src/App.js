import React from 'react';
import './App.css';
import Home from './components/home'
import CreateArea from './components/createArea';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

class  App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      currentPage: 'home',
      areas: []
    }
    this.editArea = this.editArea.bind(this)
    this.addArea = this.addArea.bind(this)
  }

  switchPage(page, area, id){
    this.setState({
      currentPage: page,
      currentArea: area,
      idCurrentArea: id
    })
  }

  addArea(area, id){
    let {areas} = this.state
    if (typeof id !== 'undefined'){
      areas.splice(id, 1, area)
    } else {
      areas.push(area)
    }
    this.setState({
      areas,
    })
  }

  editArea(tempArea, idTempArea){
    this.setState({
      currentArea: tempArea,
      idCurrentArea: idTempArea
    })
  }

  render (){
    return(
      <Router>
        <div className="App">
          <h1>GEO</h1>
          <div className="container">
          <Switch>
            <Route exact path="/">
              <Home 
                editArea={this.editArea}
                areas={this.state.areas}
              />
            </Route>
            <Route exact path="/createArea">
              <CreateArea 
                switchPage={this.switchPage}
                addArea={this.addArea}
              />
            </Route>
            <Route exact path="/editArea">
              <CreateArea 
                switchPage={this.switchPage}
                addArea={this.addArea}
                currentArea={this.state.currentArea}
                idCurrentArea={this.state.idCurrentArea}
              />
            </Route>
          </Switch>
          </div>
        </div>
      </Router>
    )
    
  }
}

export default App;
