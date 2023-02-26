import React, {Component} from 'react';
import {Alert, Skeleton} from "antd";

class President extends Component {
    render() {
        const {data, loading} = this.props.reducer.detailSite

        return (
            <div className="features feature-plant">
                <h1 className="page-title">
                    {loading ? <Skeleton.Input active={loading}/> : data.name}
                </h1>
                <Alert message="Please choose a scope plant." type="warning" />
            </div>
        )
    }
}

export default President;