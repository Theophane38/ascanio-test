import React from 'react';

class CityDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            images: [
                `https://i.picsum.photos/id/${Math.floor(Math.random() * 1085)}/180/180.jpg`,
                `https://i.picsum.photos/id/${Math.floor(Math.random() * 1085)}/180/180.jpg`,
                `https://i.picsum.photos/id/${Math.floor(Math.random() * 1085)}/180/180.jpg`,
                `https://i.picsum.photos/id/${Math.floor(Math.random() * 1085)}/180/180.jpg`,
                `https://i.picsum.photos/id/${Math.floor(Math.random() * 1085)}/180/180.jpg`,
            ]
        }
    }

    componentWillMount(){

    }

    render(){
        return (
            <div className="detailsCity">
                <h6>{this.props.name}</h6>
                <div className="images">
                    <img src={this.state.images[0]}/>
                    <img src={this.state.images[1]}/>
                    <img src={this.state.images[2]}/>
                    <img src={this.state.images[3]}/>
                    <img src={this.state.images[4]}/>
                </div>
            </div>
        )
    }
} 

export default CityDetails;
