import React from 'react';

class DynamicCitySearch extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            valueSearchBar: '',
            allCities: '',
            selectedCities: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.setFocus = this.setFocus.bind(this)
    }

    componentWillMount(){
        fetch('https://geo.api.gouv.fr/communes')
        .then(response => response.json())
        .then(data => {
            this.setState({
                allCities: data
            })
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleChange(event){
        let matchingCities = []
        this.setState({
            valueSearchBar: event.target.value
        })
        if (event.target.value.length > 2){
            for (var i=0; i < this.state.allCities.length; i++) {
                if (this.state.allCities[i].nom.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
                    let nameCurrentCity = this.state.allCities[i].nom
                    matchingCities.push(
                        <div className="item" onClick={() => this.selectCity(nameCurrentCity)}>{nameCurrentCity}</div>
                    )
                }
            }
            this.setState({
                matchingCities
            })
        } else {
            this.setState({
                matchingCities: []
            })
        }
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
            console.log(value)
        }, 500);
    }

    render(){
        return (
            <form>
                <div class="searchCity">
                    <input onFocus={() => this.setFocus(true)}  onBlur={() => this.setFocus(false)} placeHolder='Ville' value={this.state.valueSearchBar} onChange={this.handleChange}/>
                    
                    {this.state.focusedSearchBar? <div className="listMatchingCities">
                        {this.state.matchingCities}
                    </div> : ''}
                </div>
            </form>
        )
    }
} 

export default DynamicCitySearch;
