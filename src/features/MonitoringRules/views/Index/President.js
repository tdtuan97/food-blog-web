import React, {Component} from 'react';
import {Alert} from 'antd';

//import { withNamespaces } from 'react-i18next';

class President extends Component {
    render() {
        //const {t} = this.props;

        return (
            <div className="features feature-home">
                <h1 className="page-title">
                    ENTIRE DOMAIN
                </h1>
                <Alert message="Please choose a scope plant." type="warning" />
            </div>
        );
    }
}

//export default withNamespaces(['common'])(President);

export default President;
