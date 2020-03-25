import React from 'react';
import './App.css';

class  App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      cities: [
        {
          name: 'Grenoble',
          images: [],
        },
        {
          name: 'Lyon',
          images: [],
        },
        {
          name: 'Paris',
          images: [],
        },
      ]
    }
  }

  isObjectEmpty(obj){
    for(let key in obj) {
      if(obj.hasOwnProperty(key)){
        return false;
      }
    }
    return true;
  }

  render (){
    let {cities} = this.state
    let myList = []
    if (cities.length > 0){
      for(let i = 0; i < cities.length; i++) {
        console.log(cities[i])
        myList.push(
          <tr>
            <td>{cities[i].name}</td>
            <td><button>Afficher</button></td>
            <td><button>Modifier</button></td>
            <td><button>supprimer</button></td>
          </tr>
        )
      }
    } else {
      myList.push(
        <tr>
          <td colSpan={4}>Vous n'avez créé aucune ville.</td>
        </tr>
      )
    }
    return (
      <div className="App">
        <div className="container">
          <h1>Geo</h1>
          <table>
            <thead>
              <tr>
                <td>Nom de la ville</td>
                <td>Afficher</td>
                <td>Modifier</td>
                <td>Supprimer</td>
              </tr>
            </thead>
            <tbody>
              {myList}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App;
