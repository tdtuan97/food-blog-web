import React, {Component} from 'react';
import {connect} from "react-redux";
import {Divider, Form} from "antd";
import {
    AntButton,
    AntFormItem,
    AntInput,
} from "@layouts";

class CustomComponent extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {}
    }

    onSubmit = (data) => {
        this.props.onSubmit({
            id  : data.id ?? null,
            name: data.name ?? null,
        })
    }

    componentDidUpdate(prevProps) {
        let prevDetail          = prevProps.listRecipe.detail;
        let currentDetail       = this.props.listRecipe.detail;
        let prevDetailRecipe    = prevDetail.data.listRecipe ?? {}
        let currentDetailRecipe = currentDetail.data.listRecipe ?? {}

        if (prevDetailRecipe.recipeId !== currentDetailRecipe.recipeId) {
            let formData = {
                id  : currentDetailRecipe.recipeId ?? null,
                name: currentDetailRecipe.recipeName ?? "",
            }

            if (this.formRef.current) {
                this.formRef.current.setFieldsValue(formData)
            }
        }

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

    resetForm = () => {
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                ...initValues
            })
        }
    }

    render() {
        let {
                formData,
                listRecipe,
            } = this.props

        const {
                  ingredientList,
              } = this.props.home

        const {selectedFileList, previewVisible, previewImage, previewTitle} = this.state

        let {add, detail, update} = listRecipe;
        let dataDetail            = detail.data ?? {};
        const isDetail            = !!dataDetail.id

        // Response data
        const updateLoading = false;
        const createLoading = false;

        return (
            <Form
                className="form-center form-custom recipe-form"
                onFinish={(data => this.onSubmit(data))}
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
                    required={true}
                    label="Tên danh sách"
                    name="name"
                >
                    <AntInput disabled={isDetail} placeholder="Nhập tên danh sách"/>
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
        )
    }

    handleCancel = () => {
        this.setState({
            ...this.state,
            previewVisible: false
        })
    };
}

function mapStateToProps(state) {
    return {
        listRecipe: state.listRecipe,
        home      : state.home,
    }
}

export default connect(mapStateToProps, {})(CustomComponent)

const initValues = {
    id  : null,
    name: "",
}
