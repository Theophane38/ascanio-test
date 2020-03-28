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
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        .bind(this)
        this.drag = this.drag.bind(this)
        this.drop = this.drop.bind(this)
    }

    componentWillMount(){
        if (this.props.match.path !== '/createArea'){
            if (typeof this.props.initialAreas[this.props.match.params.id] !== 'undefined'){
                const a = Object.assign({}, this.props.initialAreas[this.props.match.params.id])
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
        } else if (localStorage.getItem('currentArea') !== null){
            console.log(localStorage.getItem('currentArea'))
            this.setState({
                area: JSON.parse(localStorage.getItem('currentArea'))
            })
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
        localStorage.setItem('currentArea', JSON.stringify(area))
    }

    handleChangeTitle(event){
        let {area} = this.state
        area.name = event.target.value
        this.setState({
            area
        })
        localStorage.setItem('currentArea', JSON.stringify(area))
    }

    handleChangeDescription(event){
        let {area} = this.state
        area.descrption = event.target.value
        this.setState({
            area
        })
        localStorage.setItem('currentArea', JSON.stringify(area))
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
        localStorage.setItem('currentArea', JSON.stringify(area))
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
        localStorage.setItem('currentArea', JSON.stringify(area))
    }

    saveArea(){
        this.props.addArea(this.state.area, this.props.match.params.id)
        this.props.history.push('/')
    }

    onErrorImage(id){
        let {area} = this.state
        area.images[id].url = `https://i.picsum.photos/id/${Math.floor(Math.random() * 1085)}/180/180.jpg`
        this.setState({
            area
        })
    }

    render(){
        let images = []
        let cities = []

        for (let i = 0; i < this.state.area.images.length; i++){
            images.push(
                <div className="image" onDrop={this.drop} onDragOver={this.allowDrop}>
                    <img id={i} onDragStart={this.drag} src={this.state.area.images[i].url} onError={() => this.onErrorImage(i)}/>
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
                <div className="containerForm">
                    <p>Nom de la zone</p>
                    <input type="text" value={this.state.area.name} placeholder="Entrez le nom de votre zone" onChange={this.handleChangeTitle}/>
                </div>
                <div className="containerForm">
                    <p>Description</p>
                    <textarea placeholder="Décrivez votre zone en quelques phrases..." onChange={this.handleChangeDescription}>
                        {this.state.area.descrption}
                    </textarea>
                </div>
                <div className="containerForm">
                    <p>Villes</p>
                    <ul>
                        {cities}
                    </ul>
                    {this.state.area.cities.length < 3? <DynamicCitySearch cities={this.state.area.cities} addCity={this.addCity} focusedSearchBar={this.setFocus}/> : ''}
                </div>
                <div className="imagesGrid">
                    {images}
                </div>
                <button className="cancelButton" onClick={() => this.props.openModalCancel(true)}>Supprimer</button>
                {this.state.area.cities.length > 0? <button  className="saveButton" onClick={() => this.saveArea()}>Sauvegarder</button>: ''}
            </div>
        )
    }
} 

export default withRouter(CreateArea);
