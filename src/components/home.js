import React from 'react';
import ItemAreaList from './itemAreaList'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            searchValue: ''
        }
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
    }

    handleChangeSearch(event){
        this.setState({
            searchValue: event.target.value
        })
    }

    render(){
        let {areas} = this.props
        let myList = []

        if (areas.length > 0){
            for(let i = 0; i < areas.length; i++) {
                if (areas[i].name.toUpperCase().indexOf(this.state.searchValue.toUpperCase()) > -1){
                    myList.push(
                        <ItemAreaList id={i}
                            key={'area' + i}
                            openModalDelete={this.props.openModalDelete}
                            editArea={this.props.editArea}
                            deleteArea={this.props.deleteArea}
                            area={areas[i]}
                        />
                    )
                }
            } if (myList.length === 0){
                myList.push(
                    <tr>
                        <td colSpan={5}>Aucune zone correspondante.</td>
                    </tr>
                )
            }
        } else {
            myList.push(
                <tr>
                    <td key="NoArea" colSpan={5}>Vous n'avez créé aucune zone.</td>
                </tr>
            )
        }

        return (
            <div className="home">
                <div className="searchBar">
                    <input type='text' onChange={this.handleChangeSearch} placeholder="Chercher une zone"/><FontAwesomeIcon icon={faSearch}/>
                </div>
                <p className='randomAreaButton' onClick={() => this.props.generateRandomArea()}>Générer une zone aléatoire.</p>
                <table cellSpacing="0" cellPadding="0">
                    <thead>
                        <tr>
                            <td>Nom de la zone</td>
                            <td>Villes</td>
                            <td>Description</td>
                            <td>Afficher</td>
                            <td>Actions</td>
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
