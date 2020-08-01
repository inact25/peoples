import React, {Component} from 'react';
import './assets/css/App.css';
import UserView from "./views/UserView"
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import DashboardView from "./views/DashboardView";
import PostView from "./views/PostView";
import PostByTagView from "./views/PostByTagView";
import Notfound from "./views/Notfound";
import Timeout from "./views/Timeout";
import Coba from "./views/Coba";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="App">
                        <Switch>
                            <Redirect exact from='/' to="/user"/>
                            <Route exact path="/user" component={DashboardView}/>
                            <Route path="/user/:userID/post" component={PostView}/>
                            <Route path="/user/:userID" component={UserView}/>
                            <Route exact path="/tag/:postTag/post" component={PostByTagView}/>
                            <Route path='/timeout' component={Timeout}/>
                            <Route component={Notfound}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
