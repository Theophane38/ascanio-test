import React from 'react';
import CreateCity from './createArea'
import {Link, withRouter} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


class ItemAreaList extends React.Component {

    constructor(props){
        super(props)
    }

    edit(){
        this.props.history.push('/editArea/' + this.props.id)
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
                <td className="cities">
                    <ul>
                        {listCities}
                    </ul>
                </td>
                <td className="description">{`${area.description.substring(0,100)}${area.description.length > 100? '[...]' : ''}`}</td>
                <td><button>Afficher</button></td>
                <td className="actions"><FontAwesomeIcon onClick={() => this.edit()} icon={faEdit}/><FontAwesomeIcon onClick={() => this.props.deleteArea(this.props.id)} icon={faTrashAlt}/></td>
            </tr>
        )
    }
} 

export default withRouter(ItemAreaList);
