import React, { Component } from 'react';
import {connect} from "react-redux";
import {
    setIssuesAction, setOwnerAction, setRepoAction, setAction, setIssuesCountAction,
    SET_PAGE
} from "./issuesAction";
import IssueCard from "./issueCard";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = store => {
    return {
        issues: store.issues,
        issues_count: store.issues_count,
        page: store.page,
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
        setIssuesCount: issues_count => dispatch(setIssuesCountAction(issues_count)),
        setOwner: owner => dispatch(setOwnerAction(owner)),
        setRepo: repo => dispatch(setRepoAction(repo)),
        setPage: page => dispatch(setAction(SET_PAGE, page))
    }
};
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page_count: []
        }
    }
    getIssues = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}/${this.props.repo}/${this.props.iss}?page=${this.props.page}`);
        const response = await api_call.json();
        this.props.setIssues(response);
    };

    getIssuesCount = async () => {
        const api_call = await fetch(`${this.props.baseUrl}${this.props.repos}${this.props.owner}/${this.props.repo}`);
        const response = await api_call.json();
        this.props.setIssuesCount(response.open_issues_count);
        let count = Math.ceil(response.open_issues_count/30);
        let page_c = [];
        while (count !== 0) {
            page_c.push(count);
            count--;
        }
        this.setState({
            page_count: page_c.reverse()
        });
    };

    componentDidMount() {
        this.changeIssues();
    }

    changeIssues = () => {
        this.changePage(1);
        this.getIssuesCount();
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

    changePage = (i) => {
        this.props.setPage(i).then(()=>{
            this.getIssues();
        });
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
                        {this.props.issues_count}
                    </div>
                    {
                        this.props.issues.map(issue =>
                            <IssueCard key={issue.id} issue={issue}/>
                        )
                    }
                </div>
                <div className="box row">
                    {
                        this.state.page_count.map(butt =>
                            <div key={butt}>
                                {
                                    +butt === +this.props.page?
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
