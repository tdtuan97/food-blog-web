import React, {Component} from 'react';
import {RecipeImageCover} from "./components";
import helpers from "@ultis/helpers";
import {DataEmpty, Loading} from "@layouts";
import recipeImgDefault from "@images/recipe-default.jpg";

class President extends Component {
    render() {
        const {
                  detail,
              } = this.props

        let data    = detail.data ?? {}
        let loading = detail.loading
        return (
            <div className="features feature-detail">
                {
                    loading ? <Loading/> : null
                }
                {
                    data.recipeId ? <RecipeImageCover
                        image={helpers.generateFullImage(data.image) ?? recipeImgDefault}
                    /> : <DataEmpty title="Không tìm thấy công thức"/>
                }
            </div>
        );
    }
}

export default President;