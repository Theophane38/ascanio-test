import React from 'react';
import ItemAreaList from './itemAreaList'

class Home extends React.Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){

    }

    render(){
        let {areas} = this.props
        let myList = []
        if (areas.length > 0){
            for(let i = 0; i < areas.length; i++) {
                myList.push(
                    <ItemAreaList area={areas[i]}/>
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
                <button className="createAreaButton" onClick={() => this.props.switchPage('createCity')}>Créer une zone</button>
            </div>
        )
    }
} 

export default Home;
