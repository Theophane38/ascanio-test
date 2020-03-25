import React from 'react';
import CreateCity from './createArea';

class ItemAreaList extends React.Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){

    }

    render(){
        let {area} = this.props
        console.log(area.cities)
        let listCities = []
        for (let i = 0; i < area.cities.length; i++){
            console.log(area.cities[i])
            listCities.push(<li>{area.cities[i].name}</li>)
        }
        return (
            <tr>
                <td>{area.name}</td>
                <td>
                    <ul>
                        {listCities}
                    </ul>
                </td>
                <td><button>Afficher</button></td>
                <td><button>Modifier</button></td>
                <td><button>supprimer</button></td>
            </tr>
        )
    }
} 

export default ItemAreaList;
