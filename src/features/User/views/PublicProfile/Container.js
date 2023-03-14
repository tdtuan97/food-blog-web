import React, { Component } from 'react';
import { connect } from 'react-redux';
import President from './President';
import {
    getRecipeByFollowUser,
} from "@features/Home/redux/actions";
import { withRouter } from "react-router-dom";
import { reset } from "@common/crud";
import { followUser, getUser, unfollowUser } from "@features/User/redux/actions";
import { getListRecipeManagement } from '@src/features/ListRecipe/redux/actions';
import helpers from '@src/ultis/helpers';

class Container extends Component {
    onClickFollow = (userId) => {

    }

    onClickUnfollow = (userId) => {
        
    }
    render() {
        const {
            recipeByFollowUser,
        } = this.props.home
        const {
            list,
        } = this.props.listRecipe
        let user = this.props.user.user.data ?? {}

        return (
            <President
                onClickFollow={this.onClickFollow}
                onClickUnfollow={this.onClickUnfollow}
                listRecipe={list}
                recipeByFollowUser={recipeByFollowUser}
                user={user}
            />
        )
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (helpers.getAuthUserId() === id) {
            this.props.history.push(`/profile`)
        }
        this.props.getRecipeByFollowUser();
        this.props.getListRecipeManagement(id);
        this.props.getUser(id);
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
    };
}

function mapStateToProps(state) {
    return {
        home: state.home,
        auth: state.auth,
        user: state.user,
        listRecipe: state.listRecipe,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))