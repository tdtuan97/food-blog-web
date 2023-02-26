import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {getSiteDetail} from "@features/Site/redux";
import {resetStore} from "@features/Common/redux";
import * as CONSTANTS from "@ultis/constants";

class Container extends Component {
    render() {
        return (
            <President
                reducer={this.props.site}
            />)
    }

    componentDidMount() {
        this.fetchData();
        this.props.socketIO.socket.on(CONSTANTS.SOCKET_EMIT.AUTO_REFRESH_DATA, () => this.fetchData())
    }

    componentDidUpdate(prevProps) {
        const preParams     = prevProps.match.params;
        const currentParams = this.props.match.params;

        if ((preParams.siteId !== currentParams.siteId)) {
            this.fetchData();
        }
    }

    componentWillUnmount() {
        this.props.resetStore()
    }

    fetchData = () => {
        const {siteId} = this.props.match.params;
        this.props.getSiteDetail(siteId)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetStore   : () => {
            dispatch(resetStore());
        },
        getSiteDetail: (siteId) => {
            dispatch(getSiteDetail(siteId));
        },
    };
}


function mapStateToProps(state) {
    return {
        socketIO         : state.socketIO,
        auth             : state.auth,
        common           : state.common,
        site             : state.site,
        ticketsManagement: state.ticketsManagement,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))