import React from 'react';
import ItemAreaList from './itemAreaList'
import {Link} from "react-router-dom"

class Home extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        let {areas} = this.props
        let myList = []

        if (areas.length > 0){
            for(let i = 0; i < areas.length; i++) {
                myList.push(
                    <ItemAreaList id={i} 
                        editArea={this.props.editArea}
                        deleteArea={this.props.deleteArea}
                        area={areas[i]}
                    />
                )
            }
        } else {
            myList.push(
                <tr>
                    <td colSpan={5}>Vous n'avez créé aucune zone.</td>
                </tr>
            )
        }

        return (
            <div className="home">
                <table cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <td>Nom de la zone</td>
                            <td>Villes</td>
                            <td>Afficher</td>
                            <td>Modifier</td>
                            <td>Supprimer</td>
                        </tr>
                    </thead>
                    <tbody>
                        {myList}
                    </tbody>
                </table>
                <button className="createAreaButton">
                    <Link to="/createArea">Créer une zone</Link>
                </button>
            </div>
        )
    }
} 

export default Home;
