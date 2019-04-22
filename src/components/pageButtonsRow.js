import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class PageButtonsRow extends Component {
    render() {
        return (
            <div className="row pageButtonsRow">
                {
                    this.props.page_count.length !== 0 &&
                    this.props.page_count.map(butt =>
                        <div key={butt}>
                            {
                                butt === this.props.page?
                                    <Button className="selectButton"
                                            key={butt} variant="contained">
                                        {butt}
                                    </Button>
                                    :
                                    <Button className="pageButton"
                                            key={butt} variant="contained"
                                            onClick={() => this.props.changePage(butt)}>
                                        {butt}
                                    </Button>
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}
export default PageButtonsRow;