import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import { BrowserRouter, Route} from 'react-router-dom';
import { Switch } from 'react-router';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/register" component={ Register } />
            <Route path="/login" component={ Login } />
            <Route path="/logout" component={ Logout } />
            <Route path="/profiles/:user_name" component={ Profile } />
            <Route path="/editprofiles/:user_name" component={ EditProfile } />
            <Route path="/" component={ App } />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
