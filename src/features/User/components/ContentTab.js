import React, {Component} from 'react';
import {Tabs} from "antd";
import {withRouter} from "react-router-dom";
import {RecipeCarousel} from "@features/Home/views/HomePage/components";

class UserLabel extends Component {
    render() {
        const {
                  userRecipe,
                  recipeByFollowUser,
                  countFollowed,
                  countFollowing,
              } = this.props
        return (
            <div className="content-block">
                <Tabs defaultActiveKey="1"
                      items={this.items(userRecipe, recipeByFollowUser, countFollowed, countFollowing)}
                      onChange={this.onChange}
                />
            </div>
        )
    }

    items = (userRecipe, recipeByFollowUser, countFollowed, countFollowing) => {
        return [
            {
                key     : '1',
                label   : 'Thư viện',
                children: <RecipeCarousel
                    title="Công thức của bạn"
                    listRecipe={userRecipe.data}
                    loading={userRecipe.loading}
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