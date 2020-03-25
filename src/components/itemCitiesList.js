import React from 'react';
import CreateCity from './createCity';

class ItemCitiesList extends React.Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){

    }

    render(){
        let {city} = this.props
        return (
            <tr>
                <td>{city.name}</td>
                <td><button>Afficher</button></td>
                <td><button>Modifier</button></td>
                <td><button>supprimer</button></td>
            </tr>
        )
    }
} 

export default ItemCitiesList;
