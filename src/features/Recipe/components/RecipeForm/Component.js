import React, {Component} from 'react';
import {connect} from "react-redux";
import {message, Divider, Drawer, Form, Radio, Select, Upload} from "antd";
import {
    AntButton,
    AntFormItem,
    AntInput,
    AntInputNumber,
    AntInputTextArea,
} from "@layouts";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import helpers from "@ultis/helpers";

const {Option, OptGroup} = Select;

class CustomComponent extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            ingredientConfigs: [
                {
                    ingredientId: null,
                    amount      : "",
                }
            ],

            selectedFileList: [],
            previewVisible  : false,
            previewImage    : '',
            previewTitle    : '',
        }
    }

    onClickNewCondition = () => {
        let {ingredientConfigs} = this.state;
        ingredientConfigs.push({
            ingredientId: null,
            amount      : "",
        })

        this.setState({
            ...this.state,
            ingredientConfigs: ingredientConfigs
        })
    }

    onClickRemoveCondition = (e) => {
        const idx               = e.currentTarget.value;
        let {ingredientConfigs} = this.state

        // Remove by index
        if (idx && ingredientConfigs.length > 0) {
            ingredientConfigs.splice(idx, 1);
            this.setState({
                ...this.state,
                ingredientConfigs: ingredientConfigs
            })
        }
    }

    componentDidUpdate(prevProps) {
        let prevDetail    = prevProps.recipe.detail;
        let currentDetail = this.props.recipe.detail;
        prevDetail        = prevDetail.data.recipe ?? {}
        currentDetail     = currentDetail.data.recipe ?? {}

        const prevUpdate    = prevProps.recipe.update;
        const currentUpdate = this.props.recipe.update;

        const prevCreate    = prevProps.recipe.create;
        const currentCreate = this.props.recipe.create;

        if (prevDetail.recipeId !== currentDetail.recipeId) {
            let rule = currentDetail.data;
            if (this.formRef.current) {
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
        /*if (prevUpdate.data.id !== currentUpdate.data.id) {
            setTimeout(() => {
                this.props.onCloseRule();
            }, 1000)
        }*/

        // Update success => Close
        /*if (prevCreate.data.id !== currentCreate.data.id) {
            setTimeout(() => {
                this.props.onCloseRule();
            }, 1000)
        }*/

        // Load detail portfolio form
        /*const currentDetail = this.props.portfolioConfigs.detail.data ?? {};
        const prevDetail    = prevProps.portfolioConfigs.detail.data ?? {}
        if (currentDetail !== prevDetail) {
            let {logoUrl, name} = currentDetail

            // Check is valid url
            if (logoUrl) {
                // Need init file
                let initFile = {
                    uid   : '-1',
                    name  : name,
                    status: 'done',
                    url   : logoUrl,
                };
                this.setState({
                    ...this.state,
                    selectedFileList: [initFile]
                })
            }
        }*/
    }

    onCloseRule = () => {
        this.resetForm();
        this.props.onCloseRule();
    }

    resetForm = () => {
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                ...initValues
            })
        }
    }

    render() {
        let {
                onSubmitRule,
                isVisibleFormDetail,

                recipe,
            } = this.props

        const {
                  ingredientList,
              } = this.props.home

        let {ingredientConfigs}                                              = this.state
        const {selectedFileList, previewVisible, previewImage, previewTitle} = this.state

        let listDevice               = [];
        let {create, detail, update} = recipe;
        console.log(detail)
        let dataDetail = detail.data ?? {};

        const isDetail = !!dataDetail.id

        // Response data
        const updateLoading = false;
        const createLoading = false;
        const formTitle     = isDetail ? `Rule #${dataDetail.id}` : "New rule";
        let errors          = {}

        return (
            <Form
                className="form-center form-custom recipe-form"
                onFinish={(data => onSubmitRule(data))}
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                ref={this.formRef}
                initialValues={initValues}
                style={{padding: 24}}
            >
                <AntFormItem
                    hidden={true}
                    name="id"
                >
                    <AntInput/>
                </AntFormItem>
                <AntFormItem
                    label="Ảnh bìa"
                    name="image"
                >
                    <Upload
                        fileList={selectedFileList}
                        listType="picture-card"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                        customRequest={this.customRequest}
                        onPreview={this.handlePreview}
                    >
                        {selectedFileList.length >= 1 ? null : <UploadButton/>}
                    </Upload>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Tên công thức"
                    name="name"
                >
                    <AntInput disabled={isDetail} placeholder="Nhập tên công thức"/>
                </AntFormItem>
                <AntFormItem
                    label="Mô tả"
                    name="description"
                >
                    <AntInputTextArea rows={5} placeholder="Nhập mô tả"/>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Khẩu phần"
                    name="name"
                >
                    <AntInput disabled={isDetail} placeholder="Nhập khẩu phần" addonAfter="người"/>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Thời gian chuẩn bị"
                    name="name"
                >
                    <AntInput disabled={isDetail} placeholder="Nhập thời gian chuẩn bị" addonAfter="phút"/>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Thời gian nấu"
                    name="name"
                >
                    <AntInput disabled={isDetail} placeholder="Nhập thời gian nấu" addonAfter="phút"/>
                </AntFormItem>
                {
                    ingredientConfigs.map((ingredientConfig, idx) => {
                        return (
                            <div key={idx}>
                                <ConfigRuleValue
                                    idx={idx}
                                    ingredientList={ingredientList.data ?? []}
                                    ingredientConfigs={ingredientConfigs}
                                    onRemove={this.onClickRemoveCondition}
                                />
                            </div>
                        )
                    })
                }
                <div className="btn-add-condition">
                    <AntButton
                        block
                        type="dashed"
                        icon={<PlusOutlined/>}
                        onClick={this.onClickNewCondition}
                    />
                </div>
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
        )
    }

    handleChange = ({fileList: newFileList}) => {
        this.setState({
            ...this.state,
            selectedFileList: newFileList
        })
    };

    /**
     * Custom handel upload
     * @param onSuccess
     * @param onError
     * @param file
     */
    customRequest = ({onSuccess, onError, file}) => {
        let {selectedFileList} = this.state
        try {
            let currentFile    = selectedFileList.find((item) => {
                return item.uid = file.uid
            });
            currentFile.status = "done";
            this.setState({
                ...this.state,
                selectedFileList: selectedFileList
            })
        } catch (e) {
            console.log(e)
        }
    };

    /**
     * Validate image
     * @param file
     * @returns {boolean}
     */
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    handleCancel = () => {
        this.setState({
            ...this.state,
            previewVisible: false
        })
    };

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await helpers.getBase64(file.originFileObj)
        }

        this.setState({
            ...this.state,
            previewVisible: true,
            previewImage  : file.url || file.preview,
            previewTitle  : file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    };
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe,
        home  : state.home,
    }
}

export default connect(mapStateToProps, {})(CustomComponent)

const initValues = {
    id           : null,
    ingredient   : [],
    recipe       : "",
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

const ConfigRuleValue = ({
                             idx,
                             ingredientConfig,
                             ingredientList,
                             onRemove,
                         }) => {
    return (
        <AntFormItem
            //label="Nguyên liệu"
            label={`Nguyên liệu ${idx + 1}`}
            required={true}
            style={{marginBottom: 0}}
        >
            <AntFormItem
                className="condition-item"
                required={true}
                style={{
                    display    : 'inline-block',
                    marginRight: 8,
                    width      : "calc((100% - 50px) / 2)"
                }}
                name="ruleField"
            >
                <Select
                    placeholder={"Chọn nguyên liệu"}
                >
                    {
                        ingredientList ?
                            ingredientList.map((item, index) => {
                                return (
                                    <Select.Option value={item.ingredientId} key={index}>{item.name}</Select.Option>
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
                    width      : "calc((100% - 50px) / 2)",
                    marginRight: 10
                }}
                name="value"
            >
                <AntInputNumber placeholder="Value" style={{width: "100%"}}/>
            </AntFormItem>
            <AntButton
                danger
                icon={<DeleteOutlined/>}
                onClick={onRemove}
                value={idx}
            />
        </AntFormItem>
    )

}

const PreviewImage = (props) => (
    <img
        src={props.src}
        alt={props.alt}
        style={{width: '100%'}}
    />
)

const UploadButton = () => (
    <div>
        <PlusOutlined/>
        <div
            style={{
                marginTop: 8,
            }}
        >
            Upload
        </div>
    </div>
);