import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {resetStore} from "@features/Common/redux";
import {withRouter} from "react-router-dom";
import {
    clearFormRule,
    createRule,
    getMetaConditions,
    getRule,
    getRules,
    updateRule,
    deleteRule
} from "@features/Configurations/MonitoringRules/redux/actions";
import {getDeviceList} from "@features/Device/redux";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleFormDetail   : false,
            isVisibleDeleteConfirm: false,
            ruleIdSelected        : null,
        }
    }

    /**
     * On click new rule
     */
    onClickNewRule = () => {
        this.setState({
            ...this.state,
            isVisibleFormDetail: true
        })

        // Fetch meta data
        const {plantId} = this.props.match.params;
        this.props.getMetaConditions(plantId);
        this.props.getDeviceList(plantId);
    }

    /**
     * On click edit rule
     */
    onClickEditRule = (e) => {
        this.setState({
            ...this.state,
            isVisibleFormDetail: true
        })

        // Fetch meta data
        const {plantId} = this.props.match.params;
        this.props.getMetaConditions(plantId);
        this.props.getDeviceList(plantId);
        this.props.getRule(e.currentTarget.value);
    }

    /**
     * On submit form rule
     */
    onSubmitRule = (data) => {
        let id = data.id ?? null;

        let params = {
            devices    : data.devices,
            isActive   : data.isActive,
            message    : data.message,
            name       : data.name,
            otherEmails: data.otherEmails,
            //plant        : plant,
            recipients   : data.recipients,
            reportMethods: data.reportMethods,
            ruleField    : data.ruleField,
            ruleOperator : data.ruleOperator,
            ruleTime     : data.ruleTime,
            ruleType     : data.ruleType,
            severity     : data.severity,
            value        : data.value,
        }

        // Create rule
        if (id) {
            this.props.updateRule(id, params);
        } else {
            const {plantId} = this.props.match.params;
            params.plantId    = plantId ?? null;
            this.props.createRule(params);
        }
    }

    /**
     * On click hide rule
     */
    onCloseRule = () => {
        this.setState({
            ...this.state,
            isVisibleFormDetail: false
        })
        this.props.clearFormRule();
        this.fetchData();
    }

    /**
     * On show confirm delete
     */
    onShowConfirmDelete = (e) => {
        this.setState({
            ...this.state,
            isVisibleDeleteConfirm: true,
            ruleIdSelected        : e.currentTarget.value
        })
    }

    /**
     * On close confirm delete
     */
    onCloseConfirmDelete = () => {
        this.setState({
            ...this.state,
            isVisibleDeleteConfirm: false,
            ruleIdSelected        : null
        })
    }

    /**
     * On accept delete rule
     */
    onAcceptDelete = () => {
        this.props.deleteRule(this.state.ruleIdSelected);
        this.onCloseConfirmDelete();
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        this.props.resetStore()
    }

    componentDidUpdate(prevProps) {
        const preParams     = prevProps.match.params;
        const currentParams = this.props.match.params;

        if ((preParams.plantId !== currentParams.plantId)) {
            this.fetchData();
        }

        const prevDelete    = prevProps.monitoringRules.delete;
        const currentDelete = this.props.monitoringRules.delete;

        // Delete success => Close
        if (prevDelete.data.id !== currentDelete.data.id) {
            setTimeout(() => {
                this.fetchData()
            }, 1000)
        }
    }


    fetchData = () => {
        const {plantId} = this.props.match.params;

        // Fetch rules
        this.props.getRules({plantId: plantId})
    }

    render() {
        const {
                  isVisibleFormDetail,
                  isVisibleDeleteConfirm
              } = this.state
        return (
            <President
                {...this.props}
                isVisibleFormDetail={isVisibleFormDetail}
                onClickNewRule={this.onClickNewRule}
                onClickEditRule={this.onClickEditRule}
                onSubmitRule={this.onSubmitRule}
                onCloseRule={this.onCloseRule}

                isVisibleDeleteConfirm={isVisibleDeleteConfirm}
                onShowConfirmDelete={this.onShowConfirmDelete}
                onCloseConfirmDelete={this.onCloseConfirmDelete}
                onAcceptDelete={this.onAcceptDelete}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetStore       : () => {
            dispatch(resetStore());
        },
        getMetaConditions: (plantId) => {
            dispatch(getMetaConditions(plantId));
        },
        clearFormRule    : () => {
            dispatch(clearFormRule());
        },
        getDeviceList    : (plantId) => {
            dispatch(getDeviceList(plantId));
        },
        getRules         : (params) => {
            dispatch(getRules(params));
        },
        getRule          : (ruleId) => {
            dispatch(getRule(ruleId));
        },
        createRule       : (params) => {
            dispatch(createRule(params));
        },
        updateRule       : (id, params) => {
            dispatch(updateRule(id, params));
        },
        deleteRule       : (id) => {
            dispatch(deleteRule(id));
        },
    };
}


function mapStateToProps(state) {
    return {
        router         : state.router,
        common         : state.common,
        monitoringRules: state.monitoringRules,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))