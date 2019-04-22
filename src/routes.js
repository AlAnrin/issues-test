import {Switch, Link } from "react-router-dom";
import React from 'react';
import {MakeRouteWithSubRoutes} from "./makeRouteWithSubRoutes";
import IssuesList from './containers/issuesList';
import IssueDetail from './components/issueDetail';
import App from "./containers/App";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const routes = [
    {
        path: '/home',
        title: 'Select Repo or Owner',
        component: App
    },
    {
        path: '/issues',
        title: 'Issues',
        component: IssuesList,
        routes: [
            {
                path: '/issues/:id',
                component: IssueDetail
            }
        ]
    }
];

export const Routes = (props) => {
    return (
        <div className="row">
            <Card className="menuLinks">
                <CardContent>
                    <div className="column">
                        {
                            routes.map(
                                (route =>
                                        <Link className="menuLink" key={route.path} to={route.path}>{route.title}</Link>
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
                            routes.map(
                                (route, index) => <MakeRouteWithSubRoutes key={index} {...route}/>
                            )
                        }
                    </Switch>
                </CardContent>
            </Card>
        </div>
    );
};