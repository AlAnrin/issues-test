import React, { Component } from 'react';
// import { Icon } from '@mdi/react';
// import { mdiInformationOutline, mdiPaw, mdiCommentOutline } from '@mdi/js';

class IssueDetail extends Component {
    render() {
        return (
            <div>IssueDetail {this.props.issue.number}</div>
        )
    }
}

export default IssueDetail;