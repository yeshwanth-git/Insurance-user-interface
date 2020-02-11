import React from "react";
import { HashRouter, withRouter, Route, Switch } from 'react-router-dom';
import AddUser from './AddUser';
import AddEvent from './AddEvent';
import Users from './Users';
import LandingPage from './LandingPage';
import InsuranceEvents from './InsuranceEvents';

const Routes = (props) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={'/addUser'} component={AddUser} />
        <Route exact path={'/addEvent'} component={AddEvent} />
        <Route exact path={'/users'} component={Users} />
        <Route exact path={'/userEvents'} component={InsuranceEvents} />
        <Route exact path={'/'} component={LandingPage} />
      </Switch>
    </HashRouter>
  );
}

export default withRouter(Routes);