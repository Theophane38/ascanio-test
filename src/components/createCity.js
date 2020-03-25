import React from 'react';

class CreateCity extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            valueSearchBar: '',
            allCities: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        fetch('https://geo.api.gouv.fr/communes')
        .then(response => response.json())
        .then(data => {
            console.log(data)
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
        for (var i=0; i < this.state.allCities.length; i++) {
            if (this.state.allCities[i].nom.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
                matchingCities.push(
                    <div className="item">{this.state.allCities[i].nom}</div>
                )
            }
        }
        this.setState({
            matchingCities
        })
    }

    render(){
        return (
            <div>
                <h3>Create city</h3>
                <form>
                    <div class="searchCity">
                        <input placeHolder='Ville' value={this.state.valueSearchBar} onChange={this.handleChange}/>
                        <div className="listMatchingCities">
                            {this.state.matchingCities}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
} 

export default CreateCity;
