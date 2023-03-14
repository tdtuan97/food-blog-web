import React, { Component } from 'react';
import recipeImgDefault from "@images/recipe-default.jpg";
import { Card } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import imgBookmarkOn from "@images/bookmark_on.png"
import imgBookmarkOff from "@images/bookmark_off.png"
import helpers from "@ultis/helpers";
import { connect } from "react-redux";
import { postLikeRecipe, postUnlikeRecipe } from '@src/features/Recipe/redux/actions';

class RecipeCard extends Component {

    /**
     * Click like
     */
    onClickLike = () => {
        this.props.postLikeRecipe(this.props.recipe.recipeId)
    }

    /**
     * Click unlike
     */
    onClickUnlike = () => {
        this.props.postUnlikeRecipe(this.props.recipe.recipeId)
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
        const isLike = false;
        let user = recipe.User ?? {}
        return (
            <Card
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
                            isLike ?
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        let currentLikeRecipe = this.props.recipeReducer.likeRecipe
        let prevLikeRecipe= prevProps.recipeReducer.likeRecipe

        let currentUnlikeRecipe = this.props.recipeReducer.unlikeRecipe
        let prevUnlikeRecipe = prevProps.recipeReducer.unlikeRecipe

        if(currentLikeRecipe.data !== prevLikeRecipe.data){
            this.props.callBackRefresh()
        }

        if(currentUnlikeRecipe.data !== prevUnlikeRecipe.data){
            this.props.callBackRefresh()
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postLikeRecipe: (id) => {
            dispatch(postLikeRecipe(id));
        },

        postUnlikeRecipe: (id) => {
            dispatch(postUnlikeRecipe(id));
        },
    };
}

function mapStateToProps(state) {
    return {
        recipeReducer: state.recipe,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard)