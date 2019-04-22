import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ChangeRepoOrOwner extends Component {
    render() {
        return (
            <div className="changeOwnerRepo row">
                <TextField
                    label="Owner"
                    value={this.props.owner}
                    onChange={(e) => this.props.handleChange(e, 'owner')}
                    margin="dense"
                />
                <TextField
                    label="Repo"
                    value={this.props.repo}
                    onChange={(e) => this.props.handleChange(e, 'repo')}
                    margin="dense"
                />
                <Button variant="contained" color="primary" onClick={this.props.changeIssues}>
                    change
                </Button>
            </div>
        )
    }
}
export default ChangeRepoOrOwner;