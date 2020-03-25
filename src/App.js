import React from 'react';
import './App.css';
import Home from './components/home'
import CreateCity from './components/createCity';

class  App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      currentPage: 'createCity',
      cities: [
       
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
          {this.state.currentPage === 'home'? <Home switchPage={() => this.switchPage()} cities={this.state.cities}/> : <CreateCity/>}
        </div>
      </div>
    )
    
  }
}

export default App;
