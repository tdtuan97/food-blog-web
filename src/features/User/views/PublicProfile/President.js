import React, {Component} from 'react';
import {ContentTab, UserLabel} from "@features/User/components";

class President extends Component {
    render() {
        const {
                  user,
                  userRecipe,
                  recipeByFollowUser,
              } = this.props

        let userData = user.user ?? {}
        let countFollowed = user.countFollowed ?? 0
        let countFollowing = user.countFollowing ?? 0
        return (
            <div className="features feature-self-profile">
                <UserLabel user={userData}/>
                <ContentTab
                    userRecipe={userRecipe}
                    recipeByFollowUser={recipeByFollowUser}
                    countFollowed={countFollowed}
                    countFollowing={countFollowing}
                />
            </div>
        );
    }
}

export default President;