import React, {Component} from 'react';
import recipeImgDefault from "@images/recipe-default.jpg";
import {Link} from "react-router-dom";
import {Card} from "antd";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";

class RecipeCard extends Component {
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
                        src={recipeImgDefault}
                    />
                }
            >
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
                        12
                    </span>
                </div>
            </Card>
            /*<div className="ant-row member">
                <div className="ant-col ant-col-7">
                    <Link to={'/users/' + recipe.username}>
                        <div className="member-image">
                            <img src={recipe.recipe} alt={recipe.username}/>
                        </div>
                    </Link>
                </div>
                <div className="ant-col ant-col-17">
                    <div className="member-description-wrapper">
                        <Link to={'/users/' + recipe.username}>
                            <div className="member-username">
                                {recipe.full_name}
                            </div>
                        </Link>
                        <div className="member-title">{recipe.username}</div>
                        <div className="member-description">{recipe.role === 'admin' ? 'Admin' : 'Member'}</div>
                        <div className="member-description">SSC Lunch Group</div>
                    </div>
                </div>
            </div>*/
        )
    }
}

export default RecipeCard;