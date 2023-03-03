import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {clearToken, getAuthUser} from "@features/Auth/redux/actions";
import {toggleSider} from "@features/Common/redux";

class Container extends Component {

    render() {
        return (<President
            {...this.props}
            common={this.props.common}
            handleToggleSider={this.props.toggleSider}
            handleLogout={this.props.clearToken}
        />)
    }

    componentDidMount() {
        this.props.getAuthUser()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAuthUser              : () => {
            dispatch(getAuthUser());
        },
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