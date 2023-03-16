import React, {Component} from 'react';
import {Tabs} from "antd";
import {withRouter} from "react-router-dom";
import {RecipeCarousel} from "@features/Home/views/HomePage/components";
import {ListRecipeCarousel} from "./";
import UserList from "@features/User/components/UserList";

class UserLabel extends Component {
    render() {
        return (
            <div className="content-block">
                <Tabs defaultActiveKey="1"
                      items={this.items()}
                      onChange={this.onChange}
                />
            </div>
        )
    }

    items = () => {
        const {
                  isPublicProfile,
                  listRecipe,
                  recipeByFollowUser,
                  countFollowed,
                  countFollowing,
                  userFollow,
                  userFollowing,
                  callBackRefresh
              } = this.props
        return [
            {
                key     : '1',
                label   : 'Thư viện',
                children: <ListRecipeCarousel
                    isPublicProfile={isPublicProfile}
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
                    callBackRefresh={callBackRefresh}
                    listRecipe={recipeByFollowUser.data}
                    loading={recipeByFollowUser.loading}
                />
            },
            {
                key     : '3',
                label   : `Đang theo dõi (${countFollowing})`,
                children: <UserList
                    callBackRefresh={callBackRefresh}
                    users={userFollowing.data}
                    loading={userFollowing.loading}
                />
            },
            {
                key     : '4',
                label   : `Người theo dõi (${countFollowed})`,
                children: <UserList
                    callBackRefresh={callBackRefresh}
                    users={userFollow.data}
                    loading={userFollow.loading}
                />
            },
        ];
    }
}

export default withRouter(UserLabel)