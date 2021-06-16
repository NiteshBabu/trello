import React, { Component } from 'react'
import {TrelloContext} from '../../TrelloContext'

class NewComp extends Component {
    
    static contextType = TrelloContext;

    render() {
        console.log(this.context.name)
        return (
            <div>
               {this.props.name} 
            </div>
        )
    }
}

export default NewComp