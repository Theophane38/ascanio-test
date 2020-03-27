import React from 'react';
import EditList from './components/editList';

class  App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            list: ['tomato','lettuce']
        }
    }

    render (){
        let myList = []
        for (let i = 0; i < this.state.list.length; i++){
            myList.push(<li>{this.state.list[i]}</li>)
        }
        return(
            <div>
                <ul>
                    {myList}
                </ul>
                <EditList currentList={this.state.list}/>
            </div>
        )    
    }
}

export default App;