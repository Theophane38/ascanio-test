import React from 'react';

class  EditList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentList: []
        }
    }

    componentWillMount(){
        this.setState({
            currentList: this.props.currentList
        })
        console.log()
    }

    addItem(){
        let {currentList} = this.state
        currentList.push('carrot')
        this.setState({
            currentList
        })
    }

    render(){
        let myList = []
        for (let i = 0; i < this.state.currentList.length; i++){
            myList.push(<li>{this.state.currentList[i]}</li>)
        }
        return(
            <div>
                <ul>
                    {myList}
                </ul>
                <button onClick={() => this.addItem()}>
                    addItem
                </button>
            </div>
        )
    }
}

export default EditList;