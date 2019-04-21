import React, { Component } from 'react';
import { Icon } from '@mdi/react';
import { mdiInformationOutline, mdiPaw, mdiCommentOutline } from '@mdi/js';
import * as moment from 'moment';

class IssueCard extends Component {
    issue = {};

    constructor(props) {
        super(props);

        this.issue = this.props.issue != null ? this.props.issue : {};
    }
    render() {
        return (
            <div className="card">
                {this.issue.state === 'open' ?
                    <Icon className="issueIcon openIcon" title="open issue" path={mdiInformationOutline}/> :
                    <Icon className="issueIcon closeIcon" path={mdiPaw}/>
                }
                <div className="column">
                    <a href={this.issue.html_url}><b>{this.issue.title}</b></a>
                    <span className="secondRow">
                        #{this.issue.html_url} opened at
                        <span title={moment(this.issue.updated_at).format('LLL')}> {moment(this.issue.updated_at).fromNow()} by</span>
                        <a href={this.issue.user.html_url}> {this.issue.user.login}</a>
                    </span>
                </div>
                <div className="spacer"/>
                {
                    this.issue.comments > 0 &&
                    <a className="commentDiv" href={this.issue.html_url}>
                        <Icon className="issueIcon commentIcon" path={mdiCommentOutline}/>
                        <span className="commentIcon">{this.issue.comments}</span>
                    </a>
                }
            </div>
        )
    }
}

export default IssueCard;