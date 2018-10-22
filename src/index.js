import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from './pages/store';
import './index.css';
import * as serviceWorker from './serviceWorker';

import AdminLogin from './pages/Login/Admin';
import StoreLogin from './pages/Login/Store';
import Register from './pages/Register';
import Payment from './pages/payment';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={StoreLogin} />
      <Route exact path="/caixa" component={Store} />
      <Route exact path="/caixa/pagamento" component={Payment} />

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
