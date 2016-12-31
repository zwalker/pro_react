import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import KanbanBoardContainer from './components/kanban_board_container';
import KanbanBoard from './components/KanbanBoard';
import NewCard from './components/new_card';
import EditCard from './components/edit_card';

//let cardsList = [
//  {
//    id: 1,
//    title: "Read the Book",
//    description: "I should read the **whole** book",
//    color: '#BD8D31',
//    status: "in-progress",
//    tasks: []
//  },
//  {
//    id: 2,
//    title: "Write some code",
//    description: "Code along with the samples in the book.  The complete source can be found at [github](https://github.com/pro-react)",
//    color: '#3A7E28',
//    status: "todo",
//    tasks: [
//      {
//        id: 1,
//        name: "ContactList Example",
//        done: true
//      },
//      {
//        id: 2,
//        name: "Kanban Example",
//        done: false
//      },
//      {
//        id: 3,
//        name: "My own experiments",
//        done: false
//      }
//    ]
//  }
//];
//
// ReactDom.render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));

ReactDom.render((
  <Router history={createBrowserHistory()}>
    <Route component={KanbanBoardContainer} >
      <Route path='/' component={KanbanBoard} >
        <Route path='new' component={NewCard} />
        <Route path='edit/:card_id' component={EditCard} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'));
