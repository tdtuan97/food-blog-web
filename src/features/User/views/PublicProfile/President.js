import React, { Component } from 'react';
import { ContentTab, UserLabel } from "@features/User/components";

class President extends Component {
    render() {
        const {
            onClickFollow,
            onClickUnfollow,
            user,
            listRecipe,
            recipeByFollowUser,
        } = this.props

        let userData = user.user ?? {}
        let countFollowed = user.countFollowed ?? 0
        let countFollowing = user.countFollowing ?? 0
        return (
            <div className="features feature-self-profile">
                <UserLabel
                    onClickFollow={onClickFollow}
                    onClickUnfollow={onClickUnfollow}
                    user={userData}
                />
                <ContentTab
                    isPublicProfile={true}
                    listRecipe={listRecipe}
                    recipeByFollowUser={recipeByFollowUser}
                    countFollowed={countFollowed}
                    countFollowing={countFollowing}
                />
            </div>
        );
    }
}

export default President;