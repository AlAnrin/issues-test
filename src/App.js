import React, { Component } from 'react';
import {connect} from "react-redux";
import {setIssuesAction, setOwnerAction, setRepoAction, setPageAction} from "./issuesAction";
import IssueCard from "./issueCard";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        setIssues: issues => dispatch(setIssuesAction(issues)),
        setOwner: owner => dispatch(setOwnerAction(owner)),
        setRepo: repo => dispatch(setRepoAction(repo)),
        setPage: page => dispatch(setPageAction(page))
    }
};
class App extends Component {
    getIssues = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}/${this.props.repo}/${this.props.iss}`);

        const response = await api_call.json();

        this.props.setIssues(response);
    };

    componentDidMount() {
        this.getIssues();
    }

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
                <div className="changeOwnerRepo row">
                    <TextField
                        label="Owner"
                        value={this.props.owner}
                        onChange={(e) => this.handleChange(e, 'owner')}
                        margin="small"
                    />
                    <TextField
                        label="Repo"
                        value={this.props.repo}
                        onChange={(e) => this.handleChange(e, 'repo')}
                        margin="small"
                    />
                    <Button variant="contained" color="primary" onChange={() => this.getIssues()}>
                        change
                    </Button>
                </div>
                <div className="box">
                    <div className="header">
                        {this.props.issues.length}
                    </div>
                    {
                        this.props.issues.map(issue =>
                            <IssueCard key={issue.id} issue={issue}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
