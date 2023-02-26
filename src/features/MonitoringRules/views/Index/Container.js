import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {resetStore} from "@features/Common/redux";
import {withRouter} from "react-router-dom";

class Container extends Component {
    render() {
        return (
            <President
                {...this.props}
            />
        )
    }

    componentDidMount() {
        //
    }

    componentWillUnmount() {
        //
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetStore: () => {
            dispatch(resetStore());
        },
    };
}

function mapStateToProps(state) {
    return {
        common: state.common,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))