import React, { Component } from 'react';
import { RecipeCarousel } from "./components";
import RecipeFilter from './components/RecipeFilter';

class President extends Component {
    render() {
        const {
            ingredientList,
            recipeAll,
            recipeByFollowUser,
            recipeByPopular,
            recipeByIngredient,

            ingredientSelected,
            onSelectedIngredient,

            callBackRefreshRecipe,
        } = this.props

        let listRecipeByIngredient = ingredientSelected ? recipeByIngredient.data : recipeAll.data
        let listRecipeByIngredientLoading = ingredientSelected ? recipeByIngredient.loading : recipeAll.loading

        return (
            <div className="features feature-home">
                <RecipeFilter
                    title="Các nguyên liệu đang trong mùa"
                    filterItems={ingredientList.data ?? []}
                    loading={ingredientList.loading}
                    ingredientSelected={ingredientSelected}
                    onSelectedIngredient={onSelectedIngredient}
                />

                <RecipeCarousel
                    listRecipe={listRecipeByIngredient}
                    loading={listRecipeByIngredientLoading}
                    callBackRefresh={callBackRefreshRecipe}
                />
                <RecipeCarousel
                    title="Công thức mới từ người bạn theo dõi"
                    listRecipe={recipeByFollowUser.data}
                    loading={recipeByFollowUser.loading}
                    callBackRefresh={callBackRefreshRecipe}
                />
                <RecipeCarousel
                    title="Công thức phổ biến trong tuần"
                    listRecipe={recipeByPopular.data}
                    loading={recipeByPopular.loading}
                    callBackRefresh={callBackRefreshRecipe}
                />
            </div>
        );
    }
}

export default President;