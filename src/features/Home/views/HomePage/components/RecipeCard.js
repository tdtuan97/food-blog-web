import React, {Component} from 'react';
import recipeImgDefault from "@images/recipe-default.jpg";
import {Link} from "react-router-dom";
import {Card} from "antd";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";
import imgBookmarkOn from "@images/bookmark_on.png"
import imgBookmarkOff from "@images/bookmark_off.png"

class RecipeCard extends Component {
    render() {
        const recipe = this.props.recipe;
        const isLike = false;
        let data     = {
            "date"           : "23-02-2023 02:13:02 AM",
            "recipeId"       : 10,
            "recipeName"     : "Bánh mì",
            "status"         : "CK",
            "amount"         : 4,
            "preparationTime": 60,
            "cookingTime"    : 60,
            "numberOfLikes"  : 10,
            "image"          : null,
            "description"    : null,
            "userId"         : 1,
            "createdAt"      : "2023-02-23T02:13:02.254Z",
            "updatedAt"      : "2023-02-23T02:13:02.254Z",
            "count"          : "0"
        };
        return (
            <Card
                className="card-recipe"
                hoverable
                cover={
                    <img
                        alt=""
                        src={recipe.image ?? recipeImgDefault}
                    />
                }
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

export default RecipeCard;