import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {
    getRecipeByFollowUser,
} from "@features/Home/redux/actions";
import {getRecipeManagement} from "@features/Recipe/redux/actions";
import {getUser} from "@features/User/redux/actions";
import {reset} from "@common/crud";
import helpers from "@ultis/helpers";

class Container extends Component {
    render() {
        const {
                  recipeByFollowUser,
              }  = this.props.home
        const {
                  list,
              }  = this.props.recipe
        let user = this.props.user.user.data ?? {}

        return (
            <President
                userRecipe={list}
                recipeByFollowUser={recipeByFollowUser}
                user={user}
            />
        )
    }

    componentDidMount() {
        const id = helpers.getAuthUserId();
        this.props.getRecipeByFollowUser();
        this.props.getRecipeManagement(id);
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

        getRecipeManagement: (userId) => {
            dispatch(getRecipeManagement(userId));
        },

        reset: () => {
            dispatch(reset());
        },
    };
}

function mapStateToProps(state) {
    return {
        home  : state.home,
        auth  : state.auth,
        recipe: state.recipe,
        user  : state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)