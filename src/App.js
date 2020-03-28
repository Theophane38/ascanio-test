import React from 'react';
import './App.css';
import Home from './components/home'
import CreateArea from './components/createArea'
import Modal from './components/modal'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      areas: [{
        name: 'a',
        cities: ['b'],
        images: []
      }]
    }
    this.addArea = this.addArea.bind(this)
    this.deleteArea = this.deleteArea.bind(this)
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
  

  deleteArea(id){
    let {areas} = this.state
    areas.splice(id, 1)
    this.setState({
      areas
    })
  }

  render (){
    return(
      <Router>
        {/* <Modal>
          <p>Salut</p>
        </Modal> */}
        <div className="App">
          <h1>GEO</h1>
          <div className="container">
          <Switch>
            <Route exact path="/">
              <Home 
                editArea={this.editArea}
                deleteArea={this.deleteArea}
                areas={this.state.areas}
              />
            </Route>
            <Route exact path="/createArea">
              <CreateArea 
                addArea={this.addArea}
              />
            </Route>
            <Route exact path="/editArea/:id">
              <CreateArea 
                addArea={this.addArea}
                initialAreas={this.state.areas}
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
