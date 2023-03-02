import React, {Component} from 'react';
import recipeImgDefault from "@images/recipe-default.jpg";
import {Card} from "antd";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";
import imgBookmarkOn from "@images/bookmark_on.png"
import imgBookmarkOff from "@images/bookmark_off.png"
import helpers from "@ultis/helpers";
import {withRouter} from "react-router-dom";

class RecipeCard extends Component {

    /**
     * Redirect to detail page
     */
    redirectToDetail=()=> {
        this.props.history.push(`recipe/${this.props.recipe.recipeId}/detail`)
    }

    render() {
        const recipe = this.props.recipe;
        const isLike = false;
        return (
            <Card
                className="card-recipe"
                hoverable
                cover={
                    <img
                        alt=""
                        src={helpers.generateFullImage(recipe.image) ?? recipeImgDefault}
                    />
                }
                onClick={this.redirectToDetail}
            >
                <div className="mask-card">
                    <div className="mark-title">
                        {recipe.recipeName}
                    </div>
                    <div className="mask-bottom">
                        <div className="mask-left">
                            {recipe.userName ?? "Trường Vũ"}
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
                                <HeartFilled style={{
                                    color: 'red'
                                }}/> : <HeartOutlined style={{
                                    color: 'red'
                                }}/>
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
}

export default withRouter(RecipeCard)