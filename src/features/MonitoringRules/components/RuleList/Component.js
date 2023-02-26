import React, {Component} from 'react';
import {connect} from "react-redux";
import {AntButton, AntCard, TagSeverity, TagActiveStatus, ToolboxControl} from "@layouts";
import {DeleteOutlined, EditOutlined, SettingOutlined} from "@ant-design/icons";
import {Badge, Table} from "antd";
import {withRouter} from "react-router-dom";

class CustomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            selectedId: null,
        }
    }

    render() {
        const {common}        = this.props
        const parentElementId = "rule-list";
        const fullScreenClass = parentElementId === common.fullScreen.elementId ? common.fullScreen.class : ''

        const {monitoringRules} = this.props
        const {list}            = monitoringRules
        const {loading, data}   = list
        const {
                  onClickNewRule,
                  onClickEditRule,
                  onShowConfirmDelete,
              }                 = this.props

        return (
            <AntCard
                id={parentElementId}
                className={"rule-list card-custom " + fullScreenClass}
                title={
                    <div className="card-custom-title">
                        <div className="card-information">
                            <SettingOutlined/> Rule list
                        </div>
                        <ToolboxControl
                            parentElementId={parentElementId}
                            btnAddShow={true}
                            btnAddText={"New rule"}
                            btnAddClick={onClickNewRule}
                        />
                    </div>
                }
            >
                <div className="card-custom-body full-height">
                    <Table
                        columns={columns(onClickEditRule, onShowConfirmDelete)}
                        rowKey={record => record.id}
                        dataSource={data}
                        pagination={false}
                        loading={loading}
                    />
                </div>
            </AntCard>
        )
    }
}

const columns = (onShowDetail, showConfirmDelete) => {
    return [
        {
            sorter   : (a, b) => a.name ? a.name.length : 0 - b.name ? b.name.length : 0,
            title    : 'Rule Name',
            dataIndex: 'name',
        },
        {
            sorter   : (a, b) => a.severity - b.severity,
            width    : 150,
            title    : 'Severity',
            dataIndex: 'severity',
            render   : (value, item) => <div><TagSeverity level={value}/> {item.severityText}</div>,
        },
        {
            width    : 150,
            title    : 'Rule Type',
            dataIndex: 'ruleTypeText',
        },
        {
            width    : 150,
            title    : 'Tracking Time',
            dataIndex: 'ruleTimeText',
        },
        {
            sorter   : (a, b) => a.status - b.status,
            width    : 150,
            title    : 'Status',
            dataIndex: 'status',
            render   : (value, item) => <TagActiveStatus status={value} text={item.statusText}/>,
        },
        {
            width : 100,
            align : 'center',
            title : 'Action',
            render: (value, item) => <div className="group-button">
                <AntButton
                    size="small"
                    icon={<EditOutlined/>}
                    type="primary" ghost
                    value={item.id}
                    onClick={onShowDetail}
                >
                </AntButton>
                <AntButton
                    size="small"
                    icon={<DeleteOutlined/>}
                    type="danger" ghost
                    value={item.id}
                    onClick={showConfirmDelete}
                />
            </div>
        },
    ]
};

function mapStateToProps(state) {
    return {
        common         : state.common,
        monitoringRules: state.monitoringRules,
    }
}

export default withRouter(connect(mapStateToProps, {})(CustomComponent))