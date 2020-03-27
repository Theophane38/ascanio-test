import React from 'react';
import CreateCity from './createArea'
import {Link, withRouter} from "react-router-dom"


class ItemAreaList extends React.Component {

    constructor(props){
        super(props)
    }
    
    edit(){
        this.props.editArea(this.props.area, this.props.id)
        this.props.history.push('/editArea')
    }

    render(){
        let {area} = this.props
        let listCities = []

        for (let i = 0; i < area.cities.length; i++){
            listCities.push(<li>{area.cities[i]}</li>)
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
                <td><button onClick={() => this.edit()}>Modifier</button></td>
                <td><button>supprimer</button></td>
            </tr>
        )
    }
} 

export default withRouter(ItemAreaList);
