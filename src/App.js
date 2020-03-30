import React from 'react';
import './App.css';
import Home from './components/home'
import CreateArea from './components/createArea'
import Modal from './components/modal'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      areas: [{
        name: 'Isère',
        cities: ['Grenoble', 'Meylan', 'Saint Martin d\'Hères'],
        description: 'Pellentesque sed tellus sed sapien auctor volutpat. Curabitur imperdiet ex tortor, in vulputate mi scelerisque nec. Quisque neque ex, ornare eu tempus id, pellentesque quis felis. Curabitur eget ultricies mi, non congue orci. Phasellus id augue eget libero finibus varius sit amet ac quam. Pellentesque ipsum eros, mattis sagittis mauris id, condimentum laoreet nibh. Proin porttitor, erat ut dapibus aliquet, odio sapien commodo tellus, eu tincidunt mi ex dapibus arcu. Nullam volutpat dui quis enim convallis bibendum. Cras egestas vitae elit sed dignissim. Phasellus non semper nulla. Sed id purus blandit, rhoncus libero accumsan, tristique ligula. Nulla fringilla nibh non pretium fermentum. Sed viverra, massa sed tempor egestas, elit arcu malesuada urna, ut fringilla lectus elit eget leo. Ut metus nisi, vulputate ut hendrerit eu, semper eu massa. Praesent fermentum sem et est scelerisque tincidunt. Praesent lacinia mattis gravida.        ',
        images: []
      }]
    }
    this.addArea = this.addArea.bind(this)
    this.deleteArea = this.deleteArea.bind(this)
    this.openModalCancel = this.openModalCancel.bind(this)
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

  openModalCancel(value){
    console.log(value)
    this.setState({
        modalCancel: value
    })
  }

  discarArea(){
    localStorage.clear();
    this.setState({
      modalCancel: false
  })
  }

  render (){
    return(
      <Router>
        {/* <Modal>
          <p>Salut</p>
        </Modal> */}
        <div className="App">
          <h1><span>Pimp</span><span>My</span><span>Zone</span></h1>
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
                openModalCancel={this.openModalCancel}
              />
            </Route>
            <Route exact path="/editArea/:id">
              <CreateArea 
                addArea={this.addArea}
                initialAreas={this.state.areas}
                openModalCancel={this.openModalCancel}
              />
            </Route>
          </Switch>
          </div>
          <div className={`modalBackGround  ${this.state.modalCancel? 'active' : ''}`}>
            <div className="modal">
                <p>Êtes-vous sûr de vouloir surpprimer cette zone?</p>
                <Link to="/">
                    <button onClick={() => this.discarArea(false)}>Oui</button>
                </Link>
                <button onClick={() => this.openModalCancel(false)}>Non</button>
            </div>
          </div>
        </div>
      </Router>
    )
    
  }
}

export default App;
