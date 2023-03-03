import React, {Component} from 'react';
import {RecipeCarousel} from "./components";
import { Tabs } from 'antd';

class President extends Component {
    render() {

        return (
            <div className="features feature-self-profile">
                <Tabs defaultActiveKey="1" items={this.items()} onChange={this.onChange}/>


            </div>
        );
    }


    onChange = (key) => {
        console.log(key);
    };

    items = () => {
        const {
                  recipeAll,
                  recipeByFollowUser,
              } = this.props

        return [
            {
                key     : '1',
                label   : 'Thư viện',
                children: <RecipeCarousel
                    title="Công thức mới từ người bạn theo dõi"
                    listRecipe={recipeByFollowUser.data}
                    loading={recipeByFollowUser.loading}
                />,
            },
            {
                key     : '2',
                label   : 'Yêu thích',
                children: <RecipeCarousel
                    title="Công thức phổ biến trong tuần"
                    listRecipe={recipeAll.data}
                    loading={recipeAll.loading}
                />
            },
        ];
    }
}


export default President;