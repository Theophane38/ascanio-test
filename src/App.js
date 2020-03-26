import React from 'react';
import './App.css';
import Home from './components/home'
import CreateCity from './components/createArea';

class  App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      currentPage: 'home',
      areas: [
        {
          name: 'Test',
          cities: [
            {
              name: 'Grenoble',
              images: ['','','','','']
            },
            {
              name: 'Paris',
              images: ['','','','','']
            },
            {
              name: 'Lyon',
              images: ['','','','','']
            }
          ]
        },
        {
          name: 'Test2',
          cities: [
            {
              name: 'Grenoble',
              images: ['','','','','']
            },
            {
              name: 'Paris',
              images: ['','','','','']
            },
            {
              name: 'Lyon',
              images: ['','','','','']
            }
          ]
        }
      ]
    }
  }

  switchPage(page){
    this.setState({
      currentPage: page
    })
  }

  render (){
    return(
      <div className="App">
        <h1>GEO</h1>
        <div className="container">
          {this.state.currentPage === 'home'? <Home switchPage={() => this.switchPage()} areas={this.state.areas}/> : <CreateCity/>}
        </div>
      </div>
    )
    
  }
}

export default App;
