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
        this.drag = this.drag.bind(this)
        this.drop = this.drop.bind(this)
    }

    componentWillMount(){

    }

    drag(event){
        this.setState({
            draggedImage: event.target.id
        })
    }

    drop(event){
        let {images} = this.state
        images.splice(event.target.id, 0, images.splice(this.state.draggedImage, 1)[0]);  
        this.setState({
            images,
            switchedImage: event.target.id
        })
    }

    allowDrop(event){
        event.preventDefault();
    }

    render(){
        return (
            <div className="detailsCity">
                <h6>{this.props.name}</h6>
                <div className="images">
                    <div className="image" onDrop={this.drop} onDragOver={this.allowDrop}>
                        <img id={0} onDragStart={this.drag} src={this.state.images[0]}/>
                    </div>
                    <div className="image" onDrop={this.drop} onDragOver={this.allowDrop}>
                        <img id={1} onDragStart={this.drag} src={this.state.images[1]}/>
                    </div>
                    <div className="image" onDrop={this.drop} onDragOver={this.allowDrop}>
                        <img id={2} onDragStart={this.drag} src={this.state.images[2]}/>
                    </div>
                    <div className="image" onDrop={this.drop} onDragOver={this.allowDrop}>
                        <img id={3} onDragStart={this.drag} src={this.state.images[3]}/>
                    </div>
                    <div className="image" onDrop={this.drop} onDragOver={this.allowDrop}>
                        <img id={4} onDragStart={this.drag} src={this.state.images[4]}/>
                    </div>
                </div>
            </div>
        )
    }
} 

export default CityDetails;
