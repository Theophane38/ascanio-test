import React from 'react';

class DynamicCitySearch extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            valueSearchBar: '',
            allCities: '',
            selectedCities: [],
            matchingCities: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.setFocus = this.setFocus.bind(this)
    }

    componentWillMount(){

    }

    handleChange(event){
        const matchingCities = []
        let value = event.target.value
        this.setState({
            valueSearchBar: value
        })
        console.log(matchingCities)
        fetch(`https://geo.api.gouv.fr/communes?fields=nom,population&boost=population&nom=${value}`)
        .then(response => response.json())
        .then(data => {
            let nbOptions
            if (data.length > 5){
                nbOptions = 5
            } else {
                nbOptions = data.length
            }
            for (var i=0; i < nbOptions; i++) {
                if (!this.props.cities.includes(data[i].nom)){
                    matchingCities.push(data[i].nom)
                }
            }
            console.log(matchingCities)
            this.setState({
                matchingCities
            })
        })
        .catch(error => {
            console.log(error)
        });
    }

    selectCity(nameCurrentCity){
        this.props.addCity(nameCurrentCity)
        this.setState({
            valueSearchBar: ''
        })
    }

    setFocus(value){
        setTimeout(() => {
            this.setState({
                focusedSearchBar: value
            })
        }, 500);
    }

    render(){
        let optionsCities = []
        for (let i = 0; i < this.state.matchingCities.length; i++){
            optionsCities.push(
                <div className="item" onClick={() => this.selectCity(this.state.matchingCities[i])}>{this.state.matchingCities[i]}</div>
            )
        }
        return (
            <form>
                <div class="searchCity">
                    <input onFocus={() => this.setFocus(true)}  onBlur={() => this.setFocus(false)} placeHolder='Ville' value={this.state.valueSearchBar} onChange={this.handleChange}/>
                    
                    {this.state.focusedSearchBar? <div className="listMatchingCities">
                        {optionsCities}
                    </div> : ''}
                </div>
            </form>
        )
    }
} 

export default DynamicCitySearch;
