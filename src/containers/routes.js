import { Switch, Link, Route, Redirect } from "react-router-dom";
import React, {Component} from 'react';
import {MakeRouteWithSubRoutes} from "../makeRouteWithSubRoutes";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {connect} from "react-redux";

const mapStateToProps = store => {
    return {
        routes: store.routes.routes
    };
};

class Routes extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="row">
                <Card className="menuLinks">
                    <CardContent>
                        <div className="column">
                            {
                                this.props.routes.map(
                                    (route =>
                                            <Link className="menuLink" key={route.path}
                                                  to={route.path}>{route.title}</Link>
                                    )
                                )
                            }
                        </div>
                    </CardContent>
                </Card>
                <Card className="container">
                    <CardContent>
                        <Switch>
                            {
                                this.props.routes.map(
                                    (route) => <MakeRouteWithSubRoutes key={route.path} {...route}/>
                                )
                            }
                            <Route><Redirect to='/home'/></Route>
                        </Switch>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Routes);