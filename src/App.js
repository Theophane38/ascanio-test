import React from 'react';
import './App.css';
import Home from './components/home'
import CreateArea from './components/createArea';

class  App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      currentPage: 'home',
      areas: [
        {
          name: 'Test',
          cities: ['Grenoble'],
          images: [
            {
              city: 'Grenoble',
              url: ''
            },
            {
              city: 'Grenoble',
              url: ''
            },
            {
              city: 'Grenoble',
              url: ''
            },
            {
              city: 'Grenoble',
              url: ''
            },
            {
              city: 'Grenoble',
              url: ''
            },
          ]
        },
      ]
    }
    this.switchPage = this.switchPage.bind(this)
    this.addArea = this.addArea.bind(this)
  }

  switchPage(page){
    this.setState({
      currentPage: page
    })
  }

  addArea(area){
    console.log(area)
    let {areas} = this.state
    areas.push(area)
    this.setState({
      area,
      currentPage: 'home'
    })
  }

  render (){
    return(
      <div className="App">
        <h1>GEO</h1>
        <div className="container">
          {this.state.currentPage === 'home'? <Home switchPage={this.switchPage} areas={this.state.areas}/> : <CreateArea addArea={this.addArea}/>}
        </div>
      </div>
    )
    
  }
}

export default App;
