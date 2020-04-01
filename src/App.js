import React from 'react';
import './App.css';
import Home from './components/home'
import CreateArea from './components/createArea'
import DisplayArea from './components/displayArea'
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
      idDeletingArea: null,
      areas: []
    }
    this.addArea = this.addArea.bind(this)
    this.deleteArea = this.deleteArea.bind(this)
    this.openModalCancel = this.openModalCancel.bind(this)
    this.openModalDelete = this.openModalDelete.bind(this)
    this.generateRandomArea = this.generateRandomArea.bind(this)
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
      areas,
      modalDelete: false,
      idDeletingArea: null
    })
  }
  
  discardArea(){
    localStorage.clear();
    this.setState({
      modalCancel: false
    })
  }

  openModalCancel(value){
    this.setState({
        modalCancel: value
    })
  }

  openModalDelete(value, id){
    this.setState({
        modalDelete: value,
        idDeletingArea: id
    })
  }

  getRandomWord(){
    return fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then((response) => response.json())
  }

  getRandomParagraph(){
    return fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text')
    .then((response) => response.text())
  }

  getRandomCities(){
    return fetch('https://geo.api.gouv.fr/communes?fields=nom')
    .then((response) => response.json())
  }

  getRandomDatas(){
    return Promise.all([this.getRandomWord(), this.getRandomParagraph(), this.getRandomCities()])
  }

  generateRandomArea(){
    let {areas} = this.state
    this.getRandomDatas()
    .then(([responseWord, responseDescription, responseCities]) => {
      let name = responseWord[0]
      let description = responseDescription
      let cities = []
      let images = []
      for (let i = 0; i < 3; i++){
        let city = responseCities[Math.floor(Math.random() * responseCities.length)].nom
        cities.push(city)
        for (let j = 0; j < 5; j++){
          images.push({
            city,
            url: `https://i.picsum.photos/id/${Math.floor(Math.random() * 1085)}/180/180.jpg`
          })
        }
      }
      let area = {
        name,
        description,
        cities,
        images: images
      }
      areas.push(area)
      this.setState({areas})
    })
  }

  render (){
    return(
      <Router>
        <div className="App">
          <h1><span>Pimp</span><span>My</span><span>Zone</span></h1>
          <div className="container">
          <Switch>
            <Route exact path="/">
              <Home 
                editArea={this.editArea}
                generateRandomArea={this.generateRandomArea}
                deleteArea={this.deleteArea}
                areas={this.state.areas}
                openModalDelete={this.openModalDelete}
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
                openModalDelete={this.openModalDelete}
              />
            </Route>
            <Route exact path="/displayArea/:id">
              <DisplayArea 
                initialAreas={this.state.areas}
              />
            </Route>
          </Switch>
          </div>
          <div className={`modalBackGround  ${this.state.modalCancel? 'active' : ''}`}>
            <div className="modal">
                <p>Toute modification sera predue, confirmer ?</p>
                <button className="unconfirmButton" onClick={() => this.openModalCancel(false)}>Non</button>
                <Link to="/">
                    <button className="confirmButton" onClick={() => this.discardArea()}>Oui</button>
                </Link>
            </div>
          </div>
          <div className={`modalBackGround  ${this.state.modalDelete? 'active' : ''}`}>
            <div className="modal">
                <p>Êtes-vous sûr de vouloir surpprimer cette zone?</p>
                <button className="unconfirmButton" onClick={() => this.openModalDelete(false)}>Non</button>
                <Link to="/">
                    <button className="confirmButton" onClick={() => this.deleteArea(this.state.idDeletingArea)}>Oui</button>
                </Link>
            </div>
          </div>
          <footer>Créé par <a target="_blank" href="http://theophane-duval.ovh/">Théophane Duval</a></footer>
        </div>
      </Router>
    )
    
  }
}

export default App;
