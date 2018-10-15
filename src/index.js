import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import AdminLogin from './pages/Login/Admin';
import StoreLogin from './pages/Login/Store';

const Comp = () => <h1>Comp</h1>;
const Caixa = () => <h1>Caixa</h1>;
const Cadastro = () => <h1>Cadastro</h1>;

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={StoreLogin} />
      <Route exact path="/caixa" component={Caixa} />
      <Route exact path="/caixa/pagamento" component={Comp} />

      <Route exact path="/cadastro" component={Cadastro} />
      <Route exact path="/cadastro/login" component={AdminLogin} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
