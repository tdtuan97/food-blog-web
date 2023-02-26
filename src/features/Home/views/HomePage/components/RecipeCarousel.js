import React, {Component} from 'react';
import {RecipeCard} from "./";
import {DataEmpty} from "@layouts";

class RecipeCarousel extends Component {
    render() {
        const {listRecipe} = this.props
        return (
            <div className="recipe-carousel">
                <div className="title">
                    Công thức phổ biến trong tuần
                </div>
                <div className="recipe-list">
                    {
                        (listRecipe.length ?
                            listRecipe.map((recipe, i) => {
                                return (
                                    <RecipeCard recipe={recipe} key={i}/>
                                )
                            }) : <DataEmpty/>)
                    }
                </div>
            </div>
        )
    }
}

export default RecipeCarousel;