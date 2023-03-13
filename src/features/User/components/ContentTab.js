import React, {Component} from 'react';
import {Tabs} from "antd";
import {withRouter} from "react-router-dom";
import {RecipeCarousel} from "@features/Home/views/HomePage/components";
import {ListRecipeCarousel} from "./";

class UserLabel extends Component {
    render() {
        const {
                  listRecipe,
                  recipeByFollowUser,
                  countFollowed,
                  countFollowing,
              } = this.props
        return (
            <div className="content-block">
                <Tabs defaultActiveKey="1"
                      items={this.items(listRecipe, recipeByFollowUser, countFollowed, countFollowing)}
                      onChange={this.onChange}
                />
            </div>
        )
    }

    items = (listRecipe, recipeByFollowUser, countFollowed, countFollowing) => {
        return [
            {
                key     : '1',
                label   : 'Thư viện',
                children: <ListRecipeCarousel
                    title="Danh sách công thức"
                    listRecipe={listRecipe.data}
                    loading={listRecipe.loading}
                />,
            },
            {
                key     : '2',
                label   : 'Yêu thích',
                children: <RecipeCarousel
                    title="Công thức yêu thích"
                    listRecipe={recipeByFollowUser.data}
                    loading={recipeByFollowUser.loading}
                />
            },
            {
                key     : '3',
                label   : `Đang theo dõi (${countFollowing})`,
                children: <RecipeCarousel
                    title="Công thức phổ biến trong tuần"
                    listRecipe={[]}
                    loading={false}
                />
            },
            {
                key     : '4',
                label   : `Người theo dõi (${countFollowed})`,
                children: <RecipeCarousel
                    title="Công thức phổ biến trong tuần"
                    listRecipe={[]}
                    loading={false}
                />
            },
        ];
    }
}

export default withRouter(UserLabel)