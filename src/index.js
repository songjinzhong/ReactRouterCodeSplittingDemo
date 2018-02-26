import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Link,

} from 'react-router-dom'

import './index.css'
import AsyncComponent from './AsyncComponent'

// import List from './list'
// import Detail from './detail'
// import Search from './search'

const List = AsyncComponent(() => import('./list').then(module => module.default))
const Detail = AsyncComponent(() => import('./detail').then(module => module.default))
const Search = AsyncComponent(() => import('./search').then(module => module.default))


class Test extends Component {
  render () {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">List</Link></li>
            <li><Link to="/search">search</Link></li>
            <li><Link to="/detail">detail</Link></li>
          </ul>
          <Route exact path="/" component={List} />
          <Route path="/search" component={Search} />
          <Route path="/detail" component={Detail} />
        </div>
      </Router>
    )
  }
}
ReactDOM.render(
  <Test/>,
  document.getElementById('root')
)
