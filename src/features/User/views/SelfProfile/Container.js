import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {
    getRecipeByFollowUser,
} from "@features/Home/redux/actions";
import {followUser, getUser, getUserFollow, getUserFollowing, unfollowUser} from "@features/User/redux/actions";
import {reset} from "@common/crud";
import helpers from "@ultis/helpers";
import {getListRecipeManagement} from "@features/ListRecipe/redux/actions";

class Container extends Component {
    callBackRefresh = (userId) => {
        const id = helpers.getAuthUserId();
        this.props.getUser(id);
        this.props.getUserFollow(id);
        this.props.getUserFollowing(id);
    }

    render() {
        const {
                  recipeByFollowUser,
              } = this.props.home
        const {
                  list,
              } = this.props.listRecipe
        const {
                  user,
                  userFollow,
                  userFollowing,
              } = this.props.user

        let userData = user.data ?? {}

        return (
            <President
                callBackRefresh={this.callBackRefresh}
                listRecipe={list}
                recipeByFollowUser={recipeByFollowUser}
                user={userData}
                userFollow={userFollow}
                userFollowing={userFollowing}
            />
        )
    }

    componentDidMount() {
        const id = helpers.getAuthUserId();
        this.props.getRecipeByFollowUser();
        this.props.getListRecipeManagement(id);
        this.props.getUser(id);
        this.props.getUserFollow(id);
        this.props.getUserFollowing(id);
    }

    componentWillUnmount() {
        //this.props.reset()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeByFollowUser: () => {
            dispatch(getRecipeByFollowUser());
        },

        getUser: (id) => {
            dispatch(getUser(id));
        },

        getListRecipeManagement: (userId) => {
            dispatch(getListRecipeManagement(userId));
        },

        reset: () => {
            dispatch(reset());
        },

        followUser: (id) => {
            dispatch(followUser(id));
        },

        unfollowUser: (id) => {
            dispatch(unfollowUser(id));
        },

        getUserFollow: (id) => {
            dispatch(getUserFollow(id));
        },

        getUserFollowing: (id) => {
            dispatch(getUserFollowing(id));
        },
    };
}

function mapStateToProps(state) {
    return {
        home      : state.home,
        auth      : state.auth,
        listRecipe: state.listRecipe,
        user      : state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)