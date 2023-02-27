import React, { Component } from 'react';
import { Banner, RecipeCarousel } from "./components";
import RecipeFilter from './components/RecipeFilter';

class President extends Component {
    render() {
        return (
            <div className="features feature-home">
                <RecipeFilter
                    title="Các nguyên liệu đang trong mùa"
                    filterItems={filterItems} />

                <RecipeCarousel
                    listRecipe={recipeByWeek}
                />
                <RecipeCarousel
                    title="Công thức mới từ người bạn theo dõi"
                    listRecipe={recipeByWeek}
                />
                <RecipeCarousel
                    title="Công thức phổ biến trong tuần"
                    listRecipe={recipeByWeek}
                />
            </div>
        );
    }
}

export default President;

const filterItems = [
    { "id": 1, "name": "Thịt bò", },
    { "id": 2, "name": "Kim chi", },
    { "id": 3, "name": "Giò lụa", },
    { "id": 4, "name": "Cá ngừ", },
    { "id": 5, "name": "Bắp cải", },
    { "id": 6, "name": "Tôm khô", },
    { "id": 7, "name": "Su hào", },
    { "id": 8, "name": "Đậu hũ", },
]

const recipeByWeek = [
    {
        "date": "23-02-2023 02:13:02 AM",
        "recipeId": 10,
        "recipeName": "Bánh mì",
        "status": "CK",
        "amount": 4,
        "preparationTime": 60,
        "cookingTime": 60,
        "numberOfLikes": 10,
        "image": null,
        "description": null,
        "userId": 1,
        "createdAt": "2023-02-23T02:13:02.254Z",
        "updatedAt": "2023-02-23T02:13:02.254Z",
        "count": "0"
    },
    {
        "date": "23-02-2023 02:14:02 AM",
        "recipeId": 13,
        "recipeName": "Bánh mì",
        "status": "CK",
        "amount": 4,
        "preparationTime": 60,
        "cookingTime": 60,
        "numberOfLikes": 8,
        "image": null,
        "description": null,
        "userId": 1,
        "createdAt": "2023-02-23T02:14:02.802Z",
        "updatedAt": "2023-02-23T02:14:02.802Z",
        "count": "0"
    },
    {
        "date": "23-02-2023 01:56:47 AM",
        "recipeId": 2,
        "recipeName": "Bún bò",
        "status": "CK",
        "amount": 4,
        "preparationTime": 60,
        "cookingTime": 60,
        "numberOfLikes": 2,
        "image": null,
        "description": null,
        "userId": 1,
        "createdAt": "2023-02-23T01:56:47.180Z",
        "updatedAt": "2023-02-23T01:56:47.180Z",
        "count": "1"
    },
    {
        "date": "23-02-2023 02:19:57 AM",
        "recipeId": 16,
        "recipeName": "Bánh mì",
        "status": "CK",
        "amount": 4,
        "preparationTime": 60,
        "cookingTime": 60,
        "numberOfLikes": 2,
        "image": null,
        "description": null,
        "userId": 1,
        "createdAt": "2023-02-23T02:19:57.510Z",
        "updatedAt": "2023-02-23T02:19:57.510Z",
        "count": "0"
    }
];