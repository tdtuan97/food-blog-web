import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {clearToken} from "@features/Auth/redux/actions";
import {toggleSider} from "@features/Common/redux";

class Container extends Component {

    render() {
        return (<President
            {...this.props}
            common={this.props.common}
            handleToggleSider={this.props.toggleSider}
        />)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearToken              : () => {
            dispatch(clearToken());
        },
        toggleSider             : () => {
            dispatch(toggleSider());
        },
    };
}

function mapStateToProps(state) {
    return {
        router: state.router,
        auth  : state.auth,
        common: state.common,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)