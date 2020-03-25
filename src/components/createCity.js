import React from 'react';
import DynamicCitySearch from './dynamicCitySearch'
import CityDetails from './cityDetails'

class CreateCity extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            valueSearchBar: '',
            allCities: '',
            selectedCities: []
        }
        this.addCity = this.addCity.bind(this)
    }

    addCity(value){
        console.log('tets')
        let {selectedCities} = this.state
        selectedCities.push(value)
        this.setState({
            valueSearchBar: '',
            matchingCities: [],
            selectedCities
        })
    }

    render(){
        let selectedCitiesList = []
        for (let i = 0; i < this.state.selectedCities.length; i++){
            selectedCitiesList.push(
                <CityDetails name={this.state.selectedCities[i]}/>
            )
        }
        return (
            <div>
                <h3>Création d'une zone</h3>
                <p>Nom de la zone</p>
                <input type="text"/>
                <p>Ville</p>
                {this.state.selectedCities.length < 3? <DynamicCitySearch addCity={this.addCity} focusedSearchBar={this.setFocus}/> : ''}
                {selectedCitiesList}
                {this.state.selectedCities.length > 0? <button>Sauvegarder</button>: ''}
            </div>
        )
    }
} 

export default CreateCity;
