import React from 'react';
import DynamicCitySearch from './dynamicCitySearch'

class CreateArea extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            area: {
                name: '',
                cities: [],
                images: []
            },
        }
        this.addCity = this.addCity.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.drag = this.drag.bind(this)
        this.drop = this.drop.bind(this)
    }

    addCity(value){
        let {area} = this.state
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
                <li>{this.state.area.cities[i]}</li>
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
                <button>Annuler</button>
                {this.state.area.cities.length > 0? <button onClick={() => this.props.addArea(this.state.area)}>Sauvegarder</button>: ''}
            </div>
        )
    }
} 

export default CreateArea;
