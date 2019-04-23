import React, { Component } from 'react';
import {connect} from "react-redux";
import {
    SET_PAGE_NUMBER, SET_REPO_NAME, SET_OWNER_NAME, SET_ISSUES_COUNT, SET_ISSUES, setAction, SET_PAGE_COUNT,
    SET_LOAD_REPO, SET_ROUTES
} from "../Actions";
import IssuesList from '../containers/issuesList';
import IssueDetail from '../components/issueDetail';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const mapStateToProps = store => {
    return {
        issues: store.issues.issues,
        routes: store.routes.routes,
        issues_count: store.issues.issues_count,
        load_repo: store.issues.load_repo,
        page: store.issues.page,
        page_count: store.issues.page_count,
        baseUrl: store.issues.baseUrl,
        repos: store.issues.repos,
        owner: store.issues.owner,
        repo: store.issues.repo,
        iss: store.issues.iss,
        limit: store.issues.limit,
        current_issue: store.issues.current_issue
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setIssues: issues => dispatch(setAction(SET_ISSUES, issues)),
        setIssuesCount: issues_count => dispatch(setAction(SET_ISSUES_COUNT, issues_count)),
        setOwnerName: owner => dispatch(setAction(SET_OWNER_NAME, owner)),
        setRepoName: repo => dispatch(setAction(SET_REPO_NAME, repo)),
        setPageNumber: page => dispatch(setAction(SET_PAGE_NUMBER, page)),
        setPageCount: page_count => dispatch(setAction(SET_PAGE_COUNT, page_count)),
        setLoadRepo : repo => dispatch(setAction(SET_LOAD_REPO, repo)),
        setRoutes: routes => dispatch(setAction(SET_ROUTES, routes))
    }
};
class App extends Component {
    getIssues = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}/${this.props.repo}/${this.props.iss}?page=${this.props.page}`);
        const response = await api_call.json();
        this.props.setIssues(response)
            .then(() => {
                let newRoutes = [...this.props.routes];
                newRoutes.push(
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
                    });
                this.props.setRoutes(newRoutes);
            });
    };

    getIssuesCount = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}/${this.props.repo}`);
        const response = await api_call.json();
        this.props.setLoadRepo(response);
        this.props.setIssuesCount(response.open_issues_count)
            .then(() => {
                let count = Math.ceil(this.props.issues_count/this.props.limit);
                let page_c = [];
                while (count !== 0) {
                    page_c.push(count);
                    count--;
                }
                this.props.setPageCount(page_c.reverse());
            });
    };

    changeIssues = () => {
        this.changePage(1);
        this.getIssuesCount();
    };

    changePage = (i) => {
        this.props.setPageNumber(i).then(()=>{
            this.getIssues();
        });
    };

    handleChange = (e, type) => {
        switch (type) {
            case 'owner':
                this.props.setOwnerName(e.target.value);
                break;
            case 'repo':
                this.props.setRepoName(e.target.value);
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div className="changeOwnerRepo column">
                <TextField
                    label="Owner"
                    value={this.props.owner}
                    onChange={(e) => this.handleChange(e, 'owner')}
                    margin="dense"
                />
                <TextField
                    label="Repo"
                    value={this.props.repo}
                    onChange={(e) => this.handleChange(e, 'repo')}
                    margin="dense"
                />
                <Button variant="contained" color="primary" onClick={this.changeIssues}>
                    load issues
                </Button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
