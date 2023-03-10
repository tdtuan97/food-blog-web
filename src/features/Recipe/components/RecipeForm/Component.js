import React, {Component} from 'react';
import {connect} from "react-redux";
import {message, Divider, Form, Select, Upload} from "antd";
import {
    AntButton,
    AntFormItem,
    AntInput,
    AntInputNumber,
    AntInputTextArea,
} from "@layouts";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import helpers from "@ultis/helpers";

const RECIPE_STATUS = [
    {
        id  : 'RT',
        name: 'RT',
    },
    {
        id  : 'CK',
        name: 'CK',
    }
]

class CustomComponent extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            recipeIngredients: [
                {
                    id    : null,
                    amount: "",
                }
            ],

            recipeSteps: [
                {
                    description: null,
                    image      : null,
                }
            ],

            selectedFileList: [],
            previewVisible  : false,
            previewImage    : '',
            previewTitle    : '',

            selectedIngredients: []
        }
    }

    onSubmit = (data) => {
        let {recipeIngredients, recipeSteps} = this.state;

        let selectedIngredients = [];
        recipeIngredients       = recipeIngredients.map((value, idx) => {
            let ingredientId     = data[`ingredientId[${idx}]`];
            let ingredientAmount = data[`ingredientAmount[${idx}]`];
            if (selectedIngredients.indexOf(ingredientId) !== -1) {
                return null;
            }
            selectedIngredients.push(ingredientId)
            return {
                ingredientId: ingredientId,
                amount      : ingredientAmount,
            }
        })
        recipeIngredients       = recipeIngredients.filter((value) => {
            return value !== null
        })

        recipeSteps = recipeSteps.map((value, idx) => {
            return {
                description: data[`stepDescription[${idx}]`],
            }
        })

        this.props.onSubmit({
            amount     : data.amount ?? null,
            cookTime   : data.cookTime ?? null,
            description: data.description ?? null,
            id         : data.id ?? null,
            image      : data.image ?? null,
            name       : data.name ?? null,
            prepareTime: data.prepareTime ?? null,
            status     : data.status ?? null,
            ingredient : recipeIngredients,
            step       : recipeSteps,
        })
    }

    onSelectedIngredients = (value) => {
        //console.log(value)
        //console.log(value2)
        //console.log(value3)
    }

    onClickNewRecipeIngredient = () => {
        let {recipeIngredients} = this.state;
        recipeIngredients.push({
            id    : null,
            amount: "",
        })

        this.setState({
            ...this.state,
            recipeIngredients: recipeIngredients
        })
    }

    onClickRemoveIngredient = (e) => {
        const idx               = e.currentTarget.value;
        let {recipeIngredients} = this.state

        // Remove by index
        if (idx && recipeIngredients.length > 0) {
            recipeIngredients.splice(idx, 1);
            this.setState({
                ...this.state,
                recipeIngredients: recipeIngredients
            })
        }
    }

    onClickNewRecipeStep = () => {
        let {recipeSteps} = this.state;
        recipeSteps.push({
            description: null,
            image      : null,
        })

        this.setState({
            ...this.state,
            recipeSteps: recipeSteps
        })
    }

    onClickRemoveStep = (e) => {
        const idx         = e.currentTarget.value;
        let {recipeSteps} = this.state

        // Remove by index
        if (idx && recipeSteps.length > 0) {
            recipeSteps.splice(idx, 1);
            this.setState({
                ...this.state,
                recipeSteps: recipeSteps
            })
        }
    }

    componentDidUpdate(prevProps) {
        let prevDetail          = prevProps.recipe.detail;
        let currentDetail       = this.props.recipe.detail;
        let prevDetailRecipe    = prevDetail.data.recipe ?? {}
        let currentDetailRecipe = currentDetail.data.recipe ?? {}

        if (prevDetailRecipe.recipeId !== currentDetailRecipe.recipeId) {
            let ingredient = currentDetail.data.ingredient ?? []
            let step       = currentDetailRecipe.Steps ?? [];

            let formData = {
                id         : currentDetailRecipe.recipeId ?? null,
                name       : currentDetailRecipe.recipeName ?? "",
                amount     : currentDetailRecipe.amount ?? 0,
                cookTime   : currentDetailRecipe.cookingTime ?? 0,
                prepareTime: currentDetailRecipe.preparationTime ?? 0,
                description: currentDetailRecipe.description ?? "",
                image      : currentDetailRecipe.image ?? null,
                status     : currentDetailRecipe.status ?? null,
            }

            let recipeIngredients = []
            let recipeSteps       = [];

            ingredient.map((item, idx) => {
                formData[`ingredientId[${idx}]`]     = item.ingredientId;
                formData[`ingredientAmount[${idx}]`] = item.amount;
                recipeIngredients.push({
                    id    : item.ingredientId,
                    amount: item.amount,
                })
            })

            step.map((item, idx) => {
                formData[`stepDescription[${idx}]`] = item.description;
                recipeSteps.push({
                    description: item.description,
                    image      : item.image,
                })
            })

            if (this.formRef.current) {
                this.formRef.current.setFieldsValue(formData)
            }

            this.setState({
                ...this.state,
                recipeIngredients: recipeIngredients,
                recipeSteps      : recipeSteps,
            })
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
                formData,
                recipe,
            } = this.props

        const {
                  ingredientList,
              } = this.props.home

        let {recipeIngredients, recipeSteps, selectedIngredients}            = this.state
        const {selectedFileList, previewVisible, previewImage, previewTitle} = this.state

        let {add, detail, update} = recipe;
        let dataDetail            = detail.data ?? {};
        const isDetail            = !!dataDetail.id

        // Response data
        const updateLoading = false;
        const createLoading = false;

        console.log(detail)

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
                {/*<AntFormItem
                    label="???nh b??a"
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
                </AntFormItem>*/}
                <AntFormItem
                    required={true}
                    label="T??n c??ng th???c"
                    name="name"
                >
                    <AntInput disabled={isDetail} placeholder="Nh???p t??n c??ng th???c"/>
                </AntFormItem>
                <AntFormItem
                    label="M?? t???"
                    name="description"
                >
                    <AntInputTextArea rows={5} placeholder="Nh???p m?? t???"/>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Kh???u ph???n"
                    name="amount"
                >
                    <AntInput disabled={isDetail} placeholder="Nh???p kh???u ph???n" addonAfter="ng?????i"/>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Th???i gian chu???n b???"
                    name="prepareTime"
                >
                    <AntInput disabled={isDetail} placeholder="Nh???p th???i gian chu???n b???" addonAfter="ph??t"/>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Th???i gian n???u"
                    name="cookTime"
                >
                    <AntInput disabled={isDetail} placeholder="Nh???p th???i gian n???u" addonAfter="ph??t"/>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Tr???ng th??i"
                    name="status"
                >
                    <Select
                        placeholder={"Ch???n tr???ng th??i"}
                    >
                        {
                            RECIPE_STATUS ?
                                RECIPE_STATUS.map((item, index) => {
                                    return (
                                        <Select.Option value={item.id} key={index}>{item.name}</Select.Option>
                                    )
                                }) : null
                        }
                    </Select>
                </AntFormItem>
                {
                    recipeIngredients.map((recipeIngredient, idx) => {
                        return (
                            <div key={idx}>
                                <RecipeIngredient
                                    idx={idx}
                                    ingredientList={ingredientList.data ?? []}
                                    recipeIngredient={recipeIngredient}
                                    onRemove={this.onClickRemoveIngredient}
                                    selectedIngredients={selectedIngredients}
                                    onSelectedIngredients={this.onSelectedIngredients}
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
                        onClick={this.onClickNewRecipeIngredient}
                    />
                </div>

                {
                    recipeSteps.map((step, idx) => {
                        return (
                            <div key={idx}>
                                <RecipeStep
                                    idx={idx}
                                    recipeStep={step}
                                    onRemove={this.onClickRemoveStep}
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
                        onClick={this.onClickNewRecipeStep}
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
    id         : null,
    name       : "",
    amount     : 0,
    cookTime   : 0,
    prepareTime: 0,
    description: "",
    image      : null,
    status     : null,
    ingredient : [
        {
            ingredientId    : null,
            ingredientAmount: 1,
        }
    ],
}

const RecipeStep = ({
                        idx,
                        recipeStep,
                        onRemove,
                    }) => {

    recipeStep = recipeStep ?? {}
    return (
        <AntFormItem
            label={`B?????c ${idx + 1}`}
            required={true}
            style={{marginBottom: 0}}
        >
            <AntFormItem
                className="condition-item"
                style={{
                    display    : "inline-block",
                    width      : "calc((100% - 42px))",
                    marginRight: 10
                }}
                name={`stepDescription[${idx}]`}
            >
                <AntInput placeholder="Nh???p m?? t???" style={{width: "100%"}}/>
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

const RecipeIngredient = ({
                              idx,
                              ingredientList,
                              recipeIngredient,
                              onRemove,
                              selectedIngredients,
                              onSelectedIngredients,
                          }) => {

    selectedIngredients = selectedIngredients ?? []
    recipeIngredient    = recipeIngredient ?? {}
    return (
        <AntFormItem
            label={`Nguy??n li???u ${idx + 1}`}
            required={true}
            style={{marginBottom: 0}}
        >
            <AntFormItem
                className="condition-item"
                style={{
                    display    : 'inline-block',
                    marginRight: 8,
                    width      : "calc((100% - 50px) / 2)"
                }}
                name={`ingredientId[${idx}]`}
            >
                <Select
                    placeholder={"Ch???n nguy??n li???u"}
                    onChange={onSelectedIngredients}
                >
                    {
                        ingredientList ?
                            ingredientList.map((item, index) => {
                                if (selectedIngredients.indexOf(item.ingredientId) !== -1) {
                                    return null
                                }
                                return (
                                    <Select.Option value={item.ingredientId} key={index}>{item.name}</Select.Option>
                                )
                            }) : null
                    }
                </Select>
            </AntFormItem>
            <AntFormItem
                className="condition-item"
                style={{
                    display    : "inline-block",
                    width      : "calc((100% - 50px) / 2)",
                    marginRight: 10
                }}
                name={`ingredientAmount[${idx}]`}
            >
                <AntInput placeholder="S??? l?????ng" style={{width: "100%"}}/>
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