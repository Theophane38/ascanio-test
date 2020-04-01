import React from 'react';
import {withRouter} from "react-router-dom"

class DisplayArea extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            area: {
                name: '',
                description: '',
                cities: [],
                images: []
            }
        }
    }

    componentDidMount(){
        if (typeof this.props.initialAreas[this.props.match.params.id] !== 'undefined'){
            this.setState({
                area: this.props.initialAreas[this.props.match.params.id]
            })
        } else {
            this.props.history.push('/')
        }
    }

    render(){
        let images = []
        let cities = []

        for (let i = 0; i < this.state.area.images.length; i++){
            images.push(
                <div key={'image'+i} className="image" onDrop={this.drop} onDragOver={this.allowDrop}>
                    <img alt={'image of ' + this.state.area.images.city} id={i} src={this.state.area.images[i].url}/>
                </div>
            )
        }
        
        for (let i = 0; i < this.state.area.cities.length; i++){
            cities.push(
                <li key={this.state.area.cities[i]}>{this.state.area.cities[i]}</li>
            )
        }
        return (
            <div className="displayArea">
                <h3>{this.state.area.name}</h3>
                <p className="description">{this.state.area.description}</p>
                <ul>
                    {cities}
                </ul>
                <div className="imagesGrid">
                    {images}
                </div>
            </div>
        )
    }
} 

export default withRouter(DisplayArea);
