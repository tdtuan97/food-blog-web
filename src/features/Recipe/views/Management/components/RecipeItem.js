import React, {Component} from 'react';
import recipeImgDefault from "@images/recipe-default.jpg";
import {Card} from "antd";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";
import helpers from "@ultis/helpers";
import {withRouter} from "react-router-dom";

class RecipeCard extends Component {

    /**
     * Redirect to detail page
     */
    redirectToDetail=()=> {
        this.props.history.push(`recipe/${this.props.recipe.recipeId}/edit`)
    }

    render() {
        const recipe = this.props.recipe;
        const isLike = false;

        console.log(recipe)
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
                <div className="recipe-information">
                    <div className="title">
                        {recipe.recipeName ?? ""}
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
                    {recipe.date.toString().slice(0,10)}
                </span>
            </Card>
        )
    }
}

export default withRouter(RecipeCard)