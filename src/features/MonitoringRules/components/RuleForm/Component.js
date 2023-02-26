import React, {Component} from 'react';
import {connect} from "react-redux";
import {Checkbox, Divider, Drawer, Form, Radio, Select} from "antd";
import {
    AntButton,
    AntFormItem,
    AntInput,
    AntInputNumber,
    AntInputTextArea,
} from "@layouts";

const {Option, OptGroup} = Select;

class CustomComponent extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    componentDidUpdate(prevProps) {
        const prevDetail    = prevProps.monitoringRules.detail;
        const currentDetail = this.props.monitoringRules.detail;

        const prevUpdate    = prevProps.monitoringRules.update;
        const currentUpdate = this.props.monitoringRules.update;

        const prevCreate    = prevProps.monitoringRules.create;
        const currentCreate = this.props.monitoringRules.create;

        if (prevDetail.data.id !== currentDetail.data.id) {
            let rule = currentDetail.data;
            if (this.formRef.current){
                this.formRef.current.setFieldsValue({
                    devices      : rule.devices ?? [],
                    id           : rule.id,
                    isActive     : rule.isActive ?? 1,
                    message      : rule.message ?? "",
                    name         : rule.name ?? "",
                    otherEmails  : rule.otherEmails ?? "",
                    recipients   : rule.recipients ?? [],
                    reportMethods: rule.reportMethods ?? ["email"],
                    ruleField    : rule.ruleField ?? null,
                    ruleOperator : rule.ruleOperator ?? null,
                    ruleTime     : rule.ruleTime ?? "RT",
                    ruleType     : rule.ruleType ?? 1,
                    severity     : rule.severity ?? null,
                    value        : rule.value ?? null,
                })
            }
        }

        // Update success => Close
        if (prevUpdate.data.id !== currentUpdate.data.id) {
            setTimeout(() => {
                this.props.onCloseRule();
            }, 1000)
        }

        // Update success => Close
        if (prevCreate.data.id !== currentCreate.data.id) {
            setTimeout(() => {
                this.props.onCloseRule();
            }, 1000)
        }
    }

    onCloseRule = () => {
        this.resetForm();
        this.props.onCloseRule();
    }

    resetForm = () => {
        if (this.formRef.current){
            this.formRef.current.setFieldsValue({
                ...initValues
            })
        }
    }

    render() {
        let {
                onSubmitRule,
                isVisibleFormDetail,

                device,
                monitoringRules,
            } = this.props

        let listDevice                     = device.list.data ?? [];
        let {meta, create, detail, update} = monitoringRules;
        let dataDetail                     = detail.data ?? {};
        let dataMeta                       = meta.data ?? {};

        // Meta data
        let fields     = dataMeta.fields ?? [];
        let operators  = dataMeta.operators ?? [];
        let ruleTime   = dataMeta.ruleTime ?? [];
        let ruleType   = dataMeta.ruleType ?? [];
        let severity   = dataMeta.severity ?? [];
        let status     = dataMeta.status ?? [];
        let userGroups = dataMeta.userGroups ?? {};
        let groups     = Object.keys(userGroups);
        const isDetail = !!dataDetail.id

        // Response data
        const updateLoading = false;
        const createLoading = false;
        const formTitle     = isDetail ? `Rule #${dataDetail.id}` : "New rule";
        let errors          = isDetail ? update.errors : create.errors;

        errors = errors ?? {};

        return (
            <Drawer
                className="rule-form"
                width={1000}
                placement="right"
                maskClosable={false}
                onClose={this.onCloseRule}
                visible={isVisibleFormDetail}
                title={formTitle}
            >
                <Form
                    className="form-center form-custom"
                    onFinish={(data => onSubmitRule(data))}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    ref={this.formRef}
                    initialValues={initValues}
                >
                    <AntFormItem
                        hidden={true}
                        name="id"
                    >
                        <AntInput/>
                    </AntFormItem>
                    <AntFormItem
                        required={true}
                        label="Rule Name"
                        name="name"
                        errors={errors.name}
                    >
                        <AntInput disabled={isDetail} placeholder="Enter rule name"/>
                    </AntFormItem>
                    <AntFormItem
                        className="group-button"
                        required={true}
                        label="Status"
                        name="isActive"
                        errors={errors.isActive}
                    >
                        <Radio.Group>
                            {
                                status.map((item, idx) => {
                                    return (
                                        <Radio
                                            className="radio-item"
                                            key={idx}
                                            value={item.code}
                                        >
                                            {item.name}
                                        </Radio>
                                    )
                                })
                            }
                        </Radio.Group>
                    </AntFormItem>
                    <AntFormItem
                        className={"group-button"}
                        required={true}
                        label="Rule Type"
                        name="ruleType"
                        errors={errors.ruleType}
                    >
                        <Radio.Group disabled={isDetail}>
                            {
                                ruleType.map((item, idx) => {
                                    return (
                                        <Radio
                                            className="radio-item"
                                            key={idx}
                                            value={item.code}
                                        >
                                            {item.name}
                                        </Radio>
                                    )
                                })
                            }
                        </Radio.Group>
                    </AntFormItem>
                    <AntFormItem
                        className={"group-button"}
                        required={true}
                        label="Rule Time"
                        name="ruleTime"
                        errors={errors.ruleTime}
                    >
                        <Radio.Group disabled={isDetail}>
                            {
                                ruleTime.map((item, idx) => {
                                    return (
                                        <Radio
                                            className="radio-item"
                                            key={idx}
                                            value={item.code}
                                        >
                                            {item.name}
                                        </Radio>
                                    )
                                })
                            }
                        </Radio.Group>
                    </AntFormItem>
                    <AntFormItem
                        className="group-button"
                        required={true}
                        label="Devices"
                        name="devices"
                        errors={errors.devices}
                    >
                        <Select
                            mode="multiple"
                            placeholder={"Select devices"}
                        >
                            {
                                listDevice ?
                                    listDevice.map((item, index) => {
                                        return (
                                            <Select.Option value={item.id} key={index}>{item.name}</Select.Option>
                                        )
                                    }) : null
                            }
                        </Select>
                    </AntFormItem>
                    <ConfigRuleValue
                        operators={operators}
                        fields={fields}
                        errors={errors}
                    />
                    <AntFormItem
                        required={true}
                        label="Severity"
                        name="severity"
                        errors={errors.severity}
                    >
                        <Select
                            placeholder={"Select severity"}
                        >
                            {
                                severity ?
                                    severity.map((item, index) => {
                                        return (
                                            <Select.Option value={item.code}
                                                           key={index}>{item.name}</Select.Option>
                                        )
                                    }) : null
                            }
                        </Select>
                    </AntFormItem>
                    <AntFormItem
                        label="Message"
                        name="message"
                        errors={errors.message}
                    >
                        <AntInputTextArea rows={5} placeholder="Enter alert message"/>
                    </AntFormItem>
                    <AntFormItem
                        label="Report method"
                        name="reportMethods"
                        errors={errors.reportMethods}
                    >
                        <Checkbox.Group>
                            <Checkbox value="email">Send Email</Checkbox>
                            <Checkbox value="sms" disabled={true}>Send SMS</Checkbox>
                            <Checkbox value="phone" disabled={true}>Phone Call</Checkbox>
                        </Checkbox.Group>
                    </AntFormItem>
                    <AntFormItem
                        label="Recipients"
                        name="recipients"
                        errors={errors.recipients}
                    >
                        <Select
                            showSearch
                            mode="multiple"
                            style={{width: "100%",}}
                            placeholder="Enter to search by group"
                        >
                            {
                                groups.map((group) => {
                                    let users = userGroups[group];
                                    return (
                                        <OptGroup label={group} key={group}>
                                            {
                                                users ? users.map((user) => {
                                                    return (
                                                        <Option
                                                            value={user.id}
                                                            key={user.id}
                                                        >
                                                            {user.name}
                                                        </Option>
                                                    )
                                                }) : null
                                            }
                                        </OptGroup>
                                    )
                                })
                            }
                        </Select>
                    </AntFormItem>
                    <AntFormItem
                        label="Others email"
                        errors={errors.otherEmails}
                    >
                        <AntFormItem
                            name="otherEmails"
                            style={{marginBottom: 3}}
                        >
                            <AntInput placeholder="Enter others email address"/>
                        </AntFormItem>
                        <div className="other-email">(*) Multiple email address will split by character ","</div>
                    </AntFormItem>
                    <Divider style={{marginBlock: 24}}/>
                    <div className="text-center group-button">
                        {
                            dataDetail.id ?
                                <AntButton
                                    className="btn-primary"
                                    htmlType="submit"
                                    loading={updateLoading}
                                >
                                    Update
                                </AntButton> :
                                <AntButton
                                    className="btn-success"
                                    htmlType="submit"
                                    loading={createLoading}
                                >
                                    Save
                                </AntButton>
                        }
                        <AntButton
                            onClick={this.onCloseRule}
                        >
                            Cancel
                        </AntButton>
                    </div>
                </Form>

            </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return {
        common         : state.common,
        plant          : state.plant,
        device         : state.device,
        monitoringRules: state.monitoringRules,
    }
}

export default connect(mapStateToProps, {})(CustomComponent)

const initValues = {
    devices      : [],
    id           : null,
    isActive     : 1,
    message      : "",
    name         : "",
    otherEmails  : "",
    plant        : null,
    recipients   : [],
    reportMethods: ["email"],
    ruleField    : null,
    ruleOperator : null,
    ruleTime     : "RT",
    ruleType     : 1,
    severity     : null,
    value        : null,
}

const ConfigRuleValue = ({fields, operators, errors}) => {
    return (
        <AntFormItem
            label="Config Rule"
            required={true}
            style={{marginBottom: 0}}
        >
            <AntFormItem
                className="condition-item"
                required={true}
                style={{
                    display    : 'inline-block',
                    marginRight: 8,
                    width      : "calc((100% - 216px) / 2)"
                }}
                name="ruleField"
                errors={errors.ruleField}
            >
                <Select
                    placeholder={"Select field"}
                >
                    {
                        fields ?
                            fields.map((item, index) => {
                                return (
                                    <Select.Option value={item.code} key={index}>{item.name}</Select.Option>
                                )
                            }) : null
                    }
                </Select>
            </AntFormItem>
            <AntFormItem
                className="condition-item"
                required={true}
                style={{
                    display    : "inline-block",
                    width      : 200,
                    marginRight: 8
                }}
                name="ruleOperator"
                errors={errors.ruleOperator}
            >
                <Select
                    placeholder={"Operator"}
                >
                    {
                        operators ?
                            operators.map((item, index) => {
                                return (
                                    <Select.Option value={item.code} key={index}>{item.name}</Select.Option>
                                )
                            }) : null
                    }
                </Select>
            </AntFormItem>
            <AntFormItem
                className="condition-item"
                required={true}
                style={{
                    display: "inline-block",
                    width  : "calc((100% - 216px) / 2)"
                }}
                name="value"
                errors={errors.value}
            >
                <AntInputNumber placeholder="Value" style={{width: "100%"}}/>
            </AntFormItem>
        </AntFormItem>
    )
}
