import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Upload from './components/upload/upload.component';
import Users from './components/users/users.component';
import Homepage from './pages/homepage/hompage.page';
import LoginAndRegister from './pages/loginAndRegister/loginAndRegister.page';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/users' component={Users} />
            <Route exact path='/login' component={LoginAndRegister} />
            <Route exact path='/upload' component={Upload} />

        </Switch>
    </BrowserRouter>
)

export default Routes;