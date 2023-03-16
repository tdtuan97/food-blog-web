import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import recipeImgDefault from "@images/recipe-default.jpg";
import { Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import imgBookmarkOn from "@images/bookmark_on.png"
import imgBookmarkOff from "@images/bookmark_off.png"
import helpers from "@ultis/helpers";
import { connect } from "react-redux";
import { postLikeRecipe, postUnlikeRecipe } from '@src/features/Recipe/redux/actions';

class RecipeCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uuid: helpers.makeUUID()
        }
    }

    /**
     * Click like
     */
    onClickLike = () => {
        this.props.postLikeRecipe(this.state.uuid, this.props.recipe.recipeId)
    }

    /**
     * Click unlike
     */
    onClickUnlike = () => {
        this.props.postUnlikeRecipe(this.state.uuid, this.props.recipe.recipeId)
    }

    /**
     * Redirect to detail page
     */
    redirectToDetail = () => {
        this.props.history.push(`/recipe/${this.props.recipe.recipeId}/detail`)
    }

    /**
     * Redirect to profile page
     */
    redirectToProfile = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    render() {
        const recipe = this.props.recipe;
        let user = recipe.User ?? {}
        let stateId = this.state.uuid

        let {
            likeRecipe,
            unlikeRecipe
        } = this.props.recipeReducer

        let likeLoading = likeRecipe.loading && likeRecipe.uuid === stateId
        let unlikeLoading = unlikeRecipe.loading && unlikeRecipe.uuid === stateId

        return (
            <Card
                loading={likeLoading || unlikeLoading}
                className="card-recipe"
                hoverable
                cover={
                    <img
                        alt=""
                        src={helpers.generateFullImage(recipe.image) ?? recipeImgDefault}
                        onClick={this.redirectToDetail}
                    />
                }
            >
                <div className="mask-card">
                    <div className="mark-title" onClick={this.redirectToDetail}>
                        {recipe.recipeName}
                    </div>
                    <div className="mask-bottom">
                        <div className="mask-left" onClick={() => {
                            this.redirectToProfile(user.userId)
                        }}>
                            {user.fullName ?? "Không xác định"}
                        </div>
                        <div className="mask-right">
                            {recipe.humanTime ?? "1 giờ trước"}
                        </div>
                    </div>
                </div>
                <div className="like-action">
                    <span className="like-icon">
                        {
                            recipe.isFavorite ?
                                <HeartFilled
                                    onClick={this.onClickUnlike}
                                    style={{
                                        color: 'red'
                                    }}
                                /> : <HeartOutlined
                                    onClick={this.onClickLike}
                                    style={{
                                        //color: 'red'
                                    }} />
                        }
                    </span>
                    <span className="like-number">
                        {recipe.numberOfLikes}
                    </span>
                </div>
                <span className="bookmark">
                    <img
                        src={imgBookmarkOff}
                        alt=""
                    />
                </span>
            </Card>
        )
    }

    componentDidUpdate(prevProps) {
        let currentLikeRecipe = this.props.recipeReducer.likeRecipe
        let prevLikeRecipe = prevProps.recipeReducer.likeRecipe

        let isClickLike = this.props.recipeReducer.likeRecipe.uuid === this.state.uuid;
        let isClickUnLike = this.props.recipeReducer.unlikeRecipe.uuid === this.state.uuid;

        let currentUnlikeRecipe = this.props.recipeReducer.unlikeRecipe
        let prevUnlikeRecipe = prevProps.recipeReducer.unlikeRecipe

        if ((currentLikeRecipe.data !== prevLikeRecipe.data) && isClickLike) {
            this.props.callBackRefresh()
        }

        if ((currentUnlikeRecipe.data !== prevUnlikeRecipe.data) && isClickUnLike) {
            this.props.callBackRefresh()
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postLikeRecipe: (uuid, id) => {
            dispatch(postLikeRecipe(uuid, id));
        },

        postUnlikeRecipe: (uuid, id) => {
            dispatch(postUnlikeRecipe(uuid, id));
        },
    };
}

function mapStateToProps(state) {
    return {
        recipeReducer: state.recipe,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCard))