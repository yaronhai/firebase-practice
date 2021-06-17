import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Users from './components/users/users.component';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/users' component={Users} />
        </Switch>
    </BrowserRouter>
)

export default Routes;