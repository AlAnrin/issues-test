import React, { Component } from 'react';
// import { Icon } from '@mdi/react';
// import { mdiInformationOutline, mdiPaw, mdiCommentOutline } from '@mdi/js';
import * as moment from 'moment';

class IssueDetail extends Component {
    render() {
        let issue = this.props.issue;
        return (
            <div className="column">
                <span className="grayColor"><b>{issue.title}</b> #{issue.number}</span>
                <span className="secondRow">
                    <a href={issue.user.html_url}> {issue.user.login}</a> opened this issue on
                    <span title={moment(issue.created_at).format('LLL')}> {moment(issue.updated_at).fromNow()}</span>
                </span>
                <hr/>
                <div className="column box">
                    <div className="header commentHeader">
                        <a href={issue.user.html_url}>{issue.user.login} </a>
                        commented on
                        <span title={moment(issue.updated_at).format('LLL')}> {moment(issue.updated_at).fromNow()}</span>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: issue.body}} />
                    {/*<div className="issueDetailBody">{issue.body}</div>*/}
                </div>
            </div>
        )
    }
}

export default IssueDetail;