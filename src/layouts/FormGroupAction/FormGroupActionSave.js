import React, {Component} from 'react';
import {AntButton} from "@layouts";

class CustomComponent extends Component {
    render() {
        return (
            <div className="action-item">
                <AntButton type="primary" htmlType="submit" {...this.props}>
                    Save
                </AntButton>
            </div>
        )
    }
}

export default CustomComponent