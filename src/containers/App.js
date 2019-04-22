import React, { Component } from 'react';
import {connect} from "react-redux";
import {
    SET_PAGE, SET_REPO, SET_OWNER, SET_ISSUES_COUNT, SET_ISSUES, setAction, SET_PAGE_COUNT, SET_CURRENT_ISSUE,
    SET_LOAD_REPO
} from "../issuesAction";
import ChangeRepoOrOwner from "../components/changeRepoOrOwner";

const mapStateToProps = store => {
    return {
        issues: store.issues,
        issues_count: store.issues_count,
        load_repo: store.load_repo,
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
        setLoadRepo : repo => dispatch(setAction(SET_LOAD_REPO, repo)),
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
            <ChangeRepoOrOwner owner={this.props.owner} repo={this.props.repo} changeIssues={this.changeIssues} handleChange={this.handleChange}/>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
