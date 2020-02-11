import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Routes from './modules/routes';
import { HashRouter, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Container>
        <HashRouter>
          <Switch>
            <Routes />
          </Switch>
        </HashRouter>
      </Container>
    </div>
  );
}

export default App;
