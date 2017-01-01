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
  }
};

export default KanbanApi;

