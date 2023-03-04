import React, {Component} from 'react';
import {RecipeItem} from "./";
import {DataEmpty, Loading} from "@layouts";
import {Col, Row} from 'antd';

class UserRecipes extends Component {
    render() {
        const {title, listRecipe, loading} = this.props

        return (
            <div className="recipe-carousel">
                <div className="title">
                    {title}
                </div>
                <div className="recipe-list">
                    <Row gutter={12}>
                        {
                            loading ? <Loading/> : null
                        }
                        {
                            loading === false && listRecipe.length === 0 ? <DataEmpty title="Không có công thức."/> : null
                        }
                        {
                            (listRecipe.length ?
                                listRecipe.map((recipe, i) => {
                                    return (
                                        <Col span={6} key={i}>
                                            <RecipeItem recipe={recipe}/>
                                        </Col>
                                    )
                                }) : null)
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default UserRecipes;