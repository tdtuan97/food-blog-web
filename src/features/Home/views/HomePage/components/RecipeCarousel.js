import React, { Component } from 'react';
import { RecipeCard } from "./";
import { DataEmpty } from "@layouts";
import { Col, Row } from 'antd';

class RecipeCarousel extends Component {
    render() {
        const { listRecipe, title } = this.props
        return (
            <div className="recipe-carousel">
                <div className="title">
                    {title}
                </div>
                <div className="recipe-list">
                    <Row gutter={12}>
                        {
                            (listRecipe.length ?
                                listRecipe.map((recipe, i) => {
                                    return (
                                        <Col span={6} key={i}>
                                            <RecipeCard recipe={recipe} />
                                        </Col>
                                    )
                                }) : <DataEmpty />)
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default RecipeCarousel;