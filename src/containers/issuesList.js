import React, { Component } from 'react';
import IssueCard from "../components/issueCard";
import { mdiInformationOutline} from '@mdi/js';
import { Icon } from '@mdi/react';
import PageButtonsRow from "../components/pageButtonsRow";
import {SET_ISSUES, SET_PAGE, setAction} from "../issuesAction";
import {connect} from "react-redux";

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
        limit: store.limit
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setIssues: issues => dispatch(setAction(SET_ISSUES, issues)),
        setPage: page => dispatch(setAction(SET_PAGE, page))
    }
};
class IssuesList extends Component {
    getIssues = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}/${this.props.repo}/${this.props.iss}?page=${this.props.page}`);
        const response = await api_call.json();
        this.props.setIssues(response);
    };

    changePage = (i) => {
        this.props.setPage(i).then(() => {
            this.getIssues();
        });
    };

    render() {
        let div = {};
        if (this.props.load_repo !== null)
            div = <div>
                <div className="box">
                    <div className="header">
                        <Icon className="headerIcon" path={mdiInformationOutline}/>
                        <span>{this.props.issues_count} Open</span>
                    </div>
                    {
                        this.props.issues.map(issue =>
                            <IssueCard issue={issue} key={issue.number}
                                       match={this.props.match.url}/>
                        )
                    }
                </div>
                <PageButtonsRow page_count={this.props.page_count} page={this.props.page}
                                changePage={this.changePage}/>
            </div>;
        else
            div = <div>Please, select repo and owner first and load issues</div>;
        return (div)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesList);