import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'mewford'
};

class KanbanBoardContainer extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cards: []
    };
  }
  
  componentDidMount(){
    fetch(API_URL+'/cards', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  } 

  addTask(cardId, taskName){
  }

  deleteTask(cardId, taskId, taskIndex){
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    console.log(cardIndex);
    console.log(cardId);
    console.log(taskId);
    console.log(taskIndex);
    // Create a new object without a task
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$splice: [[taskIndex, 1]]}
      }
    });

    // set the component state to the mutate state
    this.setState({cards: nextState});
  }

  toggleTask(cardId, taskId, taskIndex){
  }

  render() {
    return <KanbanBoard 
      cards={this.state.cards}
      taskCallbacks={
        {
          toggle: this.toggleTask.bind(this),
          delete: this.deleteTask.bind(this),
          add: this.addTask.bind(this)
        }
      } 
    />
  }
}

export default KanbanBoardContainer;
