import React, {Component} from 'react';
import {Banner, RecipeCarousel} from "./components";

class President extends Component {
    render() {
        return (
            <div className="features feature-home">
                <RecipeCarousel listRecipe={recipeByWeek}/>
                <Banner/>
            </div>
        );
    }
}

export default President;

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