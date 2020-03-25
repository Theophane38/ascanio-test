import React from 'react';
import ItemCitiesList from './itemCitiesList'

class Home extends React.Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){

    }

    render(){
        let {cities} = this.props
        let myList = []
        if (cities.length > 0){
            for(let i = 0; i < cities.length; i++) {
                myList.push(
                    <ItemCitiesList city={cities[i]}/>
                )
            }
        } else {
            myList.push(
                <tr>
                    <td colSpan={4}>Vous n'avez créé aucune ville.</td>
                </tr>
            )
        }
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Nom de la ville</td>
                            <td>Afficher</td>
                            <td>Modifier</td>
                            <td>Supprimer</td>
                        </tr>
                    </thead>
                    <tbody>
                        {myList}
                    </tbody>
                </table>
                <button onClick={() => this.props.switchPage('createCity')}>Ajouter une ville</button>
            </div>
        )
    }
} 

export default Home;
