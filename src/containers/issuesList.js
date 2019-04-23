import React, { Component } from 'react';
import IssueCard from "../components/issueCard";
import { mdiInformationOutline} from '@mdi/js';
import { Icon } from '@mdi/react';
import PageButtonsRow from "../components/pageButtonsRow";
import {SET_ISSUES, SET_PAGE_NUMBER, SET_CURRENT_ISSUE, setAction} from "../Actions";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import IssueDetail from '../components/issueDetail';

const mapStateToProps = store => {
    return {
        issues: store.issues.issues,
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
        setPageNumber: page => dispatch(setAction(SET_PAGE_NUMBER, page)),
        setCurrentIssue: issue => dispatch(setAction(SET_CURRENT_ISSUE, issue))
    }
};
class IssuesList extends Component {
    getIssues = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}/${this.props.repo}/${this.props.iss}?page=${this.props.page}`);
        const response = await api_call.json();
        this.props.setIssues(response);
    };

    changePage = (i) => {
        this.props.setPageNumber(i).then(() => {
            this.getIssues();
            const elem = document.documentElement;
            elem.scrollTop = 0;
        });
    };

    setCurrIssue = (issue) => {
        this.props.setCurrentIssue(issue);
    };

    render() {
        console.log(this.props);
        return (
            <div>
                {
                    this.props.location.pathname === this.props.match.path ?
                        <div>
                            <div className="box">
                                <div className="header">
                                    <Icon className="headerIcon" path={mdiInformationOutline}/>
                                    <span>{this.props.issues_count} Open</span>
                                </div>
                                {
                                    this.props.issues.map(issue =>
                                        <IssueCard issue={issue} key={issue.number} changeCurrentIssue={this.setCurrIssue}
                                                   match={this.props.match.url}/>
                                    )
                                }
                            </div>
                            <PageButtonsRow page_count={this.props.page_count} page={this.props.page}
                                            changePage={this.changePage}/>
                        </div>
                        :
                        <Route path={`${this.props.match.path}/:id`}
                               render={() => <IssueDetail issue={this.props.current_issue}/>}/>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesList);