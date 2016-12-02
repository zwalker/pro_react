import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Router, Route, IndexRoute, Link } from 'react-router';

import About from './about';
import Home from './home';
import Repos from './repos';

class App extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      route: window.location.hash.substr(1)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      });
    });
  }

  render() {
    return (
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/repos'>Repos</Link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    )
  }
}

ReactDom.render((
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='about' component={About}/>
      <Route path='repos' component={Repos}/>
    </Route>
  </Router>),
  document.getElementById('root')
);
