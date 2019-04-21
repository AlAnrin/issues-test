import React, { Component } from 'react';
import {connect} from "react-redux";
import {
    SET_PAGE, SET_REPO, SET_OWNER, SET_ISSUES_COUNT, SET_ISSUES, setAction, SET_PAGE_COUNT
} from "./issuesAction";
import IssueCard from "./issueCard";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { mdiInformationOutline} from '@mdi/js';
import { Icon } from '@mdi/react';

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
        limit: store.limit
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setIssues: issues => dispatch(setAction(SET_ISSUES, issues)),
        setIssuesCount: issues_count => dispatch(setAction(SET_ISSUES_COUNT, issues_count)),
        setOwner: owner => dispatch(setAction(SET_OWNER, owner)),
        setRepo: repo => dispatch(setAction(SET_REPO, repo)),
        setPage: page => dispatch(setAction(SET_PAGE, page)),
        setPageCount: page_count => dispatch(setAction(SET_PAGE_COUNT, page_count))
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
                <div className="changeOwnerRepo row">
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
                        change
                    </Button>
                </div>
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
                <div className="box row">
                    {
                        this.props.page_count.length !== 0 &&
                        this.props.page_count.map(butt =>
                            <div key={butt}>
                                {
                                    butt === this.props.page?
                                        <Button className="selectButton"
                                                key={butt} variant="contained" color="primary">
                                            {butt}
                                        </Button>
                                        :
                                        <Button className="pageButton"
                                                key={butt} variant="contained" color="primary"
                                                onClick={() => this.changePage(butt)}>
                                            {butt}
                                        </Button>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
