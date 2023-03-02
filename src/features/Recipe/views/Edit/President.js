import React, {Component} from 'react';
import {RecipeImageCover} from "./components";
import helpers from "@ultis/helpers";
import {AntButton, DataEmpty, Loading} from "@layouts";
import recipeImgDefault from "@images/recipe-default.jpg";
import {Avatar, Col, Row} from "antd";
import {ClockCircleOutlined, FieldTimeOutlined, UserOutlined} from "@ant-design/icons";
import BadgeImageDefault from "@images/recipe-default.jpg";
import {Input} from 'antd';
import {RecipeForm} from "@features/Recipe/components";

const {TextArea} = Input;

class President extends Component {
    render() {
        let {
                detail,
                ingredientList
            } = this.props

        let data    = detail.data ?? {}
        let loading = detail.loading

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
                    (loading === false && !recipe.recipeId) ? <DataEmpty title="Không tìm thấy công thức"/> : null
                }
                {
                    recipe.recipeId ?
                        <div className="recipe-detail-wrap">
                            <RecipeForm detail={detail}/>
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default President;