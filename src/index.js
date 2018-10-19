import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from './pages/store';
import './index.css';
import * as serviceWorker from './serviceWorker';

import AdminLogin from './pages/Login/Admin';
import StoreLogin from './pages/Login/Store';
import Register from './pages/Register';

const Comp = () => <h1>Comp</h1>;

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={StoreLogin} />
      <Route exact path="/caixa" component={Store} />
      <Route exact path="/caixa/pagamento" component={Comp} />

      <Route exact path="/cadastro" component={Register} />
      <Route exact path="/cadastro/login" component={AdminLogin} />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
