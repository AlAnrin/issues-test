import React, { Component } from 'react';
import {connect} from "react-redux";
import {setIssuesAction} from "./issuesAction";
import IssueCard from "./issueCard";

const mapStateToProps = store => {
    return {
        issues: store.issues,
        baseUrl: store.baseUrl,
        repos: store.repos,
        owner: store.owner,
        repo: store.repo,
        iss: store.iss
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setIssues: issues => dispatch(setIssuesAction(issues))
    }
};
class App extends Component {
    getIssues = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}${this.props.repo}${this.props.iss}`);

        const response = await api_call.json();

        this.props.setIssues(response);
    };

    componentDidMount() {
        this.getIssues();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {
                        this.props.issues.map(issue =>
                            <IssueCard key={issue.id} issue={issue}/>
                        )
                    }
                </header>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
