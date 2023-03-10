import React, {Component} from 'react';
import {RecipeImageCover} from "./components";
import helpers from "@ultis/helpers";
import {AntButton, DataEmpty, Loading} from "@layouts";
import recipeImgDefault from "@images/recipe-default.jpg";
import {Avatar, Col, Row} from "antd";
import {ClockCircleOutlined, FieldTimeOutlined, UserOutlined} from "@ant-design/icons";
import BadgeImageDefault from "@images/recipe-default.jpg";
import {Input, Popconfirm} from 'antd';

const {TextArea} = Input;

class President extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open          : false,
            confirmLoading: false,
        }
    }

    showPopconfirm = () => {
        this.setOpen(true);
    };

    setOpen = (value) => {
        this.setState({
            ...this.state,
            open: value,
        });
    };

    setConfirmLoading = (value) => {
        this.setState({
            ...this.state,
            confirmLoading: value,
        });
    };

    handleOk = (recipeId) => {
        this.setConfirmLoading(true);
        setTimeout(() => {
            this.props.onDeleteComment(recipeId)
            this.setOpen(false);
            this.setConfirmLoading(false);
        }, 500);
    };

    handleCancel = () => {
        this.setOpen(false)
    };

    render() {
        let {
                submitLoading,
                comments,
                detail,

                commentText,
                onChangeComment,
                onSubmitComment,

                isEdit,
                onUpdateComment,
            } = this.props

        let isLoadingComments = comments.loading;
        comments              = comments ? comments.data : {};
        let userComments      = comments.comment ?? [];
        let myComment         = comments.myComment ?? {}
        let isEmptyComment    = isLoadingComments === false && userComments.length === 0;

        let data          = detail.data ?? {}
        let loading       = detail.loading
        let isLockComment = !!myComment.recipeId && (isEdit === false)

        let {
                recipe,
                ingredient,
            }      = data
        recipe     = recipe ?? {}
        ingredient = ingredient ?? {}
        let user   = recipe.User ?? {}
        let steps  = recipe.Steps ?? []
        let {
                amount,
                cookingTime,
                date,
                description,
                image,
                numberOfLikes,
                preparationTime,
                recipeId,
                recipeName,
                status,
                userId,
            }      = recipe

        return (
            <div className="features feature-detail">
                {
                    loading ? <Loading/> : null
                }
                {
                    (loading === false && !recipeId) ? <DataEmpty title="Kh??ng t??m th???y c??ng th???c"/> : null
                }
                {
                    recipeId ?
                        <div className="recipe-detail-wrap">
                            <RecipeImageCover
                                image={helpers.generateFullImage(image) ?? recipeImgDefault}
                            />
                            <div className="content-detail">
                                <div className="detail-component title">
                                    {recipeName ?? ""}
                                </div>
                                <div className="detail-component recipe-auth">
                                    <span className="auth-avatar">{
                                        helpers.generateFullImage(user.avatar) ?
                                            <Avatar
                                                src={<img
                                                    src={helpers.generateFullImage(user.avatar) ?? BadgeImageDefault}
                                                    alt=""/>}
                                            /> : <Avatar
                                                icon={<UserOutlined/>}
                                            />
                                    }</span>
                                    <span className="auth-name">{user.fullName}</span>
                                    <span className="auth-last-update">	??? 1 gi??? tr?????c</span>
                                </div>
                                {
                                    description ?
                                        <div className="detail-component description">
                                            {description}
                                        </div> : <div className="detail-component description text-center">
                                            Kh??ng c?? m?? t??? v??? c??ng th???c n??y.
                                        </div>
                                }
                                <div className="detail-component information">
                                    <Row gutter={12} className="text-center">
                                        <Col span={8}>
                                            <div>
                                                <UserOutlined style={{fontSize: 36, color: "purple"}}/>
                                            </div>
                                            <div>
                                                Kh???u ph???n
                                            </div>
                                            <div className="infor-value">
                                                {amount} ng?????i
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <FieldTimeOutlined style={{fontSize: 36, color: "#e9a32970"}}/>
                                            <div>
                                                Chu???n b???
                                            </div>
                                            <div className="infor-value">
                                                {preparationTime} ph??t
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <ClockCircleOutlined style={{fontSize: 36, color: "red"}}/>
                                            <div>
                                                Th???c hi???n
                                            </div>
                                            <div className="infor-value">
                                                {cookingTime} ph??t
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="detail-component ingredient">
                                    <div className="label">
                                        Nguy??n li???u
                                    </div>
                                    <div className="ingredient-list">
                                        {
                                            (ingredient.length ?
                                                ingredient.map((item, i) => {
                                                    return (
                                                        <div className="ingredient-item" key={i}>
                                                            {item.amount ?? ""} {item.ingredientName ?? ""}
                                                        </div>
                                                    )
                                                }) : null)
                                        }
                                    </div>
                                </div>
                                <div className="detail-component steps">
                                    <div className="label">
                                        Th???c hi???n
                                    </div>
                                    <div className="step-list">
                                        {
                                            (steps.length ?
                                                steps.map((item, i) => {
                                                    return (
                                                        <div className="step-item" key={i}>
                                                            <div className="step-num">
                                                                B?????c {i + 1}
                                                            </div>
                                                            <div className="step-description">
                                                                {item.description}
                                                            </div>
                                                            {
                                                                helpers.generateFullImage(item.image) ?
                                                                    <div className="step-img">
                                                                        <img
                                                                            src={helpers.generateFullImage(item.image) ?? recipeImgDefault}
                                                                            alt=""/>
                                                                    </div> : null
                                                            }
                                                        </div>
                                                    )
                                                }) : null)
                                        }
                                    </div>
                                </div>
                                <div className="detail-component comments">
                                    <div className="comment-area">
                                        <div>
                                            <TextArea
                                                rows={4}
                                                placeholder="Vi???t b??nh lu???n"
                                                value={commentText}
                                                onChange={onChangeComment}
                                                disabled={isLockComment}
                                            />
                                        </div>
                                        <div className="comment-action">
                                            <AntButton
                                                type="primary"
                                                onClick={onSubmitComment}
                                                disabled={isLockComment}
                                                loading={submitLoading}
                                            >
                                                B??nh lu???n
                                            </AntButton>
                                        </div>
                                    </div>
                                    <div className="label">
                                        T???t c??? t????ng t??c
                                    </div>
                                    <div className="user-comments">
                                        {
                                            isEmptyComment ? <DataEmpty title={"Ch??a c?? b??nh lu???n."}/> : null
                                        }
                                        {
                                            (userComments.length ?
                                                userComments.map((item, i) => {
                                                    let commentUser   = item.User ?? {}
                                                    let commentUserId = item.userId ?? null
                                                    let isOwner       = commentUserId === helpers.getAuthUserId()
                                                    return (
                                                        <div className="comment-item" key={i}>
                                                            <div className="left">
                                                                <Avatar
                                                                    src={<img
                                                                        src={helpers.generateFullImage(commentUser.avatar) ?? BadgeImageDefault}
                                                                        alt=""/>}
                                                                />
                                                            </div>
                                                            <div className="right">
                                                                <div className="comment-auth">
                                                                    <span
                                                                        className="label">{commentUser.fullName}</span>
                                                                    <span className="comment-last-update">	??? 1 gi??? tr?????c</span>
                                                                </div>
                                                                <div className="comment-text">
                                                                    {item.comment}
                                                                </div>
                                                                {
                                                                    !isOwner ? null :
                                                                        <div className="comment-self-action">
                                                                            <AntButton
                                                                                className="btn-action btn-update"
                                                                                type="link"
                                                                                onClick={() => {
                                                                                    onUpdateComment(item.comment)
                                                                                }}
                                                                            >
                                                                                Ch???nh s???a
                                                                            </AntButton>

                                                                            <Popconfirm
                                                                                title="X??c nh???n xo?? ?"
                                                                                open={this.state.open}
                                                                                onConfirm={() => {
                                                                                    this.handleOk(recipeId)
                                                                                }}
                                                                                okButtonProps={{
                                                                                    loading: this.state.confirmLoading,
                                                                                }}
                                                                                onCancel={this.handleCancel}
                                                                            >
                                                                                <AntButton
                                                                                    className="btn-action btn-delete"
                                                                                    type="link"
                                                                                    value={recipeId}
                                                                                    onClick={this.showPopconfirm}
                                                                                >
                                                                                    Xo??
                                                                                </AntButton>
                                                                            </Popconfirm>


                                                                        </div>

                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }) : null)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default President;