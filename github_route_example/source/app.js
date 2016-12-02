import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { Router, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import About from './about';
import Home from './home';
import Repos from './repos';
import RepoDetails from './repo_details';
import ServerError from './server_error';

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
            <li><Link to='/about' activeClassName='active'>About</Link></li>
            <li><Link to='/repos' activeClassName='active'>Repos</Link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    )
  }
}

ReactDom.render((
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='about' component={About} title='About Us'/>
      <Route path='repos' component={Repos}>
        <Route path='/repo/:repo_name' component={RepoDetails} />
      </Route>
      <Route path='error' component={ServerError} />
    </Route>
  </Router>),
  document.getElementById('root')
);
