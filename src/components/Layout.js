import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../routes";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Welcome to React SSR!",
        };
    }

    render() {
        return (
            <div>
                <h1>{ this.state.title }</h1>
                <Switch>
                    { routes.map( route => <Route key={ route.path } { ...route } /> ) }
                </Switch>
            </div>
        );
    }
}

export default Layout;
