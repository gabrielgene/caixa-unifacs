import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Store from './pages/store';
import './index.css';
import * as serviceWorker from './serviceWorker';

const Comp = () => <h1>Comp</h1>;

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Comp} />
      <Route path="/caixa" component={Store} />
      <Route path="/caixa/pagamento" component={Comp} />

      <Route path="/cadastro" component={Comp} />
      <Route path="/cadastro/login" component={Comp} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
