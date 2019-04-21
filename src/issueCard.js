import React, { Component } from 'react';
import { Icon } from '@mdi/react';
import { mdiInformationOutline, mdiPaw, mdiCommentOutline } from '@mdi/js';
import * as moment from 'moment';

class IssueCard extends Component {
    render() {
        let issue = this.props.issue;
        return (
            <div className="card">
                {issue.state === 'open' ?
                    <Icon className="issueIcon openIcon" title="open issue" path={mdiInformationOutline}/> :
                    <Icon className="issueIcon closeIcon" path={mdiPaw}/>
                }
                <div className="row">
                    <a href={issue.html_url}><b>{issue.title}</b></a>
                    <span className="secondRow">
                        #{issue.number} opened at
                        <span title={moment(issue.updated_at).format('LLL')}> {moment(issue.updated_at).fromNow()} by</span>
                        <a href={issue.user.html_url}> {issue.user.login}</a>
                    </span>
                </div>
                {/*<div className="spacer"/>*/}
                {
                    issue.comments > 0 &&
                    <a className="commentDiv" href={issue.html_url}>
                        <Icon className="issueIcon commentIcon" path={mdiCommentOutline}/>
                        <span className="commentIcon">{issue.comments}</span>
                    </a>
                }
            </div>
        )
    }
}

export default IssueCard;