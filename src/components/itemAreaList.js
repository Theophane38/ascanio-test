import React from 'react';
import {withRouter} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


class ItemAreaList extends React.Component {

    edit(){
        this.props.history.push('/editArea/' + this.props.id)
    }

    display(){
        this.props.history.push('/displayArea/' + this.props.id)
    }

    render(){
        let {area} = this.props
        let listCities = []

        for (let i = 0; i < area.cities.length; i++){
            listCities.push(<li key={'city'+i}>{area.cities[i]}</li>)
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
                <td className="display"><button onClick={() => this.display()}>Afficher</button></td>
                <td className="actions"><FontAwesomeIcon onClick={() => this.edit()} icon={faEdit}/><FontAwesomeIcon onClick={() => this.props.openModalDelete(true, this.props.id)} icon={faTrashAlt}/></td>
            </tr>
        )
    }
} 

export default withRouter(ItemAreaList);
