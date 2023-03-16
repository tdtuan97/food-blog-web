import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {
    getRecipeByFollowUser,
} from "@features/Home/redux/actions";
import {withRouter} from "react-router-dom";
import {reset} from "@common/crud";
import {followUser, getUser, getUserFollow, getUserFollowing, unfollowUser} from "@features/User/redux/actions";
import {getListRecipeManagement} from '@src/features/ListRecipe/redux/actions';
import helpers from '@src/ultis/helpers';

class Container extends Component {
    callBackRefresh = () => {
        const {id} = this.props.match.params;
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
        const {id} = this.props.match.params;
        if (helpers.getAuthUserId() === parseInt(id)) {
            this.props.history.push(`/profile`)
        }
        this.props.getRecipeByFollowUser();
        this.props.getListRecipeManagement(id);
        this.props.getUser(id);
        this.props.getUserFollow(id);
        this.props.getUserFollowing(id);
    }

    componentDidUpdate(prevProps) {
        let currentId = this.props.match.params.id
        let prevId    = prevProps.match.params.id

        console.log(helpers.getAuthUserId())
        console.log(currentId)
        if (helpers.getAuthUserId() === parseInt(currentId)) {
            this.props.history.push(`/profile`)
        }
        if(currentId !== prevId){
            this.props.getRecipeByFollowUser();
            this.props.getListRecipeManagement(currentId);
            this.props.getUser(currentId);
            this.props.getUserFollow(currentId);
            this.props.getUserFollowing(currentId);
        }
    }

    componentWillUnmount() {
        this.props.reset()
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
        user      : state.user,
        listRecipe: state.listRecipe,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))