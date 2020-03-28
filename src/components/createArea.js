import React from 'react';
import DynamicCitySearch from './dynamicCitySearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {Link, withRouter, useParams} from "react-router-dom"

class CreateArea extends React.Component {

    constructor(){
        super()
        this.state = {
            area: {
                name: '',
                cities: [],
                images: []
            },
            modalCancel: false,
        }
        this.addCity = this.addCity.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.drag = this.drag.bind(this)
        this.drop = this.drop.bind(this)
    }

    componentWillMount(){
        if (typeof this.props.match.params.id !== 'undefined'){
            if (typeof this.props.initialAreas[this.props.match.params.id] !== 'undefined'){
                const a = Object.assign({}, this.props.initialAreas[0])
                let area = {}
                area.name = a.name
                area.cities = a.cities.slice(0)
                area.images = a.images.slice(0)
                console.log(this.props.initialAreas)
                this.setState({
                    area
                })
            } else {
                this.props.history.push('/')
            }
        }
    }

    addCity(value){
        console.log(this.props.initialAreas)
        let area = this.state.area
        area.cities.push(value)
        for (let i = 0; i < 5; i++){
            area.images.push(
                {
                    city: value,
                    url: `https://i.picsum.photos/id/${Math.floor(Math.random() * 1085)}/180/180.jpg`
                }
            )
        }
        this.setState({
            matchingCities: [],
            area
        })
    }

    handleChange(event){
        let {area} = this.state
        area.name = event.target.value
        this.setState({
            area
        })
    }

    
    drag(event){
        this.setState({
            draggedImage: event.target.id
        })
    }

    drop(event){
        let {area} = this.state
        area.images.splice(event.target.id, 0, area.images.splice(this.state.draggedImage, 1)[0]);  
        this.setState({
            area,
            switchedImage: event.target.id
        })
    }

    allowDrop(event){
        event.preventDefault();
    }

    removeCity(id){
        let {area} = this.state
        let cityName = area.cities[id]

        area.cities.splice(id, 1)
        for (let i = 0; i < area.images.length; i++){
            console.log(area.images[i].city)
            if (area.images[i].city === cityName){
                area.images.splice(i, 1)
                i = -1
            }
        }

        this.setState({
            area,
        })
    }

    openModalCancel(value){
        this.setState({
            modalCancel: value
        })
    }

    saveArea(){
        this.props.addArea(this.state.area, this.props.match.params.id)
        this.props.history.push('/')
    }

    render(){
        let images = []
        let cities = []

        for (let i = 0; i < this.state.area.images.length; i++){
            images.push(
                <div className="image" onDrop={this.drop} onDragOver={this.allowDrop}>
                    <img id={i} onDragStart={this.drag} src={this.state.area.images[i].url}/>
                </div>
            )
        }
        
        for (let i = 0; i < this.state.area.cities.length; i++){
            cities.push(
                <li>{this.state.area.cities[i]} <FontAwesomeIcon onClick={() => this.removeCity(i)} className="close" icon={faTimes}/></li>
            )
        }

        return (
            <div className="createArea">
                <h3>Création d'une zone</h3>
                <p>Nom de la zone</p>
                <input type="text" value={this.state.area.name} onChange={this.handleChange}/>
                <ul>
                    {cities}
                </ul>
                {this.state.area.cities.length < 3? <DynamicCitySearch addCity={this.addCity} focusedSearchBar={this.setFocus}/> : ''}
                <div className="imagesGrid">
                    {images}
                </div>
                <button onClick={() => this.openModalCancel(true)}>Annuler</button>
                {this.state.area.cities.length > 0? <button onClick={() => this.saveArea()}>Sauvegarder</button>: ''}
                <div className={`modalBackGround  ${this.state.modalCancel? 'active' : ''}`}>
                    <div className="modal">
                        <p>Êtes-vous sûr ?</p>
                        <Link to="/">
                            <button>Oui</button>
                        </Link>
                        <button onClick={() => this.openModalCancel(false)}>Non</button>
                    </div>
                </div>
            </div>
        )
    }
} 

export default withRouter(CreateArea);
