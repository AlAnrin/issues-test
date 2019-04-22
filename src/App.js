import React, { Component } from 'react';
import {connect} from "react-redux";
import {
    SET_PAGE, SET_REPO, SET_OWNER, SET_ISSUES_COUNT, SET_ISSUES, setAction, SET_PAGE_COUNT, SET_CURRENT_ISSUE
} from "./issuesAction";
import IssueCard from "./components/issueCard";
import { mdiInformationOutline} from '@mdi/js';
import { Icon } from '@mdi/react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { withRouter } from "react-router";
import IssueDetail from "./components/IssueDetail";
import ChangeRepoOrOwner from "./components/changeRepoOrOwner";
import PageButtonsRow from "./components/pageButtonsRow";

const mapStateToProps = store => {
    return {
        issues: store.issues,
        issues_count: store.issues_count,
        page: store.page,
        page_count: store.page_count,
        baseUrl: store.baseUrl,
        repos: store.repos,
        owner: store.owner,
        repo: store.repo,
        iss: store.iss,
        limit: store.limit,
        current_issue: store.current_issue
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setIssues: issues => dispatch(setAction(SET_ISSUES, issues)),
        setIssuesCount: issues_count => dispatch(setAction(SET_ISSUES_COUNT, issues_count)),
        setOwner: owner => dispatch(setAction(SET_OWNER, owner)),
        setRepo: repo => dispatch(setAction(SET_REPO, repo)),
        setPage: page => dispatch(setAction(SET_PAGE, page)),
        setPageCount: page_count => dispatch(setAction(SET_PAGE_COUNT, page_count)),
        setCurrentIssueAction: curr_issue => dispatch(setAction(SET_CURRENT_ISSUE, curr_issue))
    }
};
class App extends Component {
    getIssues = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}/${this.props.repo}/${this.props.iss}?page=${this.props.page}`);
        const response = await api_call.json();
        this.props.setIssues(response);
    };

    getIssuesCount = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}/${this.props.repo}`);
        const response = await api_call.json();
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

    componentDidMount() {
        this.changeIssues();
    }

    changeIssues = () => {
        this.changePage(1);
        this.getIssuesCount();
    };

    changePage = (i) => {
        this.props.setPage(i).then(()=>{
            this.getIssues();
        });
    };

    handleChange = (e, type) => {
        switch (type) {
            case 'owner':
                this.props.setOwner(e.target.value);
                break;
            case 'repo':
                this.props.setRepo(e.target.value);
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div className="App">
                <div className="container">
                    <ChangeRepoOrOwner owner={this.props.owner} repo={this.props.repo} changeIssues={this.changeIssues} handleChange={this.handleChange}/>
                    <div className="box">
                        <div className="header">
                            <Icon className="headerIcon" path={mdiInformationOutline}/>
                            <span>{this.props.issues_count} Open</span>
                        </div>
                        {
                            this.props.issues.map(issue =>
                                <IssueCard key={issue.id} issue={issue}/>
                            )
                        }
                    </div>
                    <PageButtonsRow page_count={this.props.page_count} page={this.props.page} changePage={this.changePage}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
