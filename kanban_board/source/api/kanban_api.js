import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
 'Content-Type': 'application/json',
 Authorization: 'mewford'
};

let KanbanApi = {
  fetchCards() {
    return fetch(API_URL+'/cards', {headers: API_HEADERS})
    .then((response) => response.json());
  },

  createCard(card) {
    return fetch(API_URL+'/cards',
      {
        method: 'post',
        headers: API_HEADERS,
        body: JSON.stringify(card)
      }
    )
    .then((response) => response.json());
  },

  updateCard(card, draftCard) {
    return fetch(`${API_URL}/cards/${card.id}`,
      {
        method: 'put',
        headers: API_HEADERS,
        body: JSON.stringify(draftCard)
      }
    )
    .then((response) => response.json());
  },

  persistCardDrag(cardId, status, row_order_position) {
    return fetch(`${API_URL}/cards/${card.id}`,
      {
        method: 'put',
        headers: API_HEADERS,
        body: JSON.stringify({status, row_order_position})
      }
    )
    .then((response) => response.json());
  },

  addTask(cardId, task) {
    return fetch(`${API_URL}/cards/${cardId}/tasks`,
      {
        method: 'post',
        headers: API_HEADERS,
        body: JSON.stringify(task)
      }
    )
    .then((response) => response.json());
  },

  deleteTask(cardId, task) {
    return fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`,
      {
        method: 'delete',
        headers: API_HEADERS
      }
    )
  },

  toggleTask(cardId, taskId, done) {
    return fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,
      {
        method: 'put',
        headers: API_HEADERS,
        body: JSON.stringify({done})
      }
    )
    .then((response) => response.json());
  }
};

export default KanbanApi;

