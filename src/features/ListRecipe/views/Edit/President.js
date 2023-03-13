import React, {Component} from 'react';
import {ListRecipeForm} from "@features/ListRecipe/components";

class President extends Component {
    render() {
        const {
                  detail,
                  onClickUpdate
              } = this.props
        return (
            <div className="features feature-detail">
                <div className="recipe-detail-wrap">
                    <ListRecipeForm
                        formData={detail}
                        onSubmit={onClickUpdate}
                    />
                </div>
            </div>
        );
    }
}

export default President;