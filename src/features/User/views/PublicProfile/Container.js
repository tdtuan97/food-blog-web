import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {
    getRecipeByFollowUser,
} from "@features/Home/redux/actions";
import {getRecipeManagement} from "@features/Recipe/redux/actions";
import {withRouter} from "react-router-dom";
import {reset} from "@common/crud";
import {getUser} from "@features/User/redux/actions";

class Container extends Component {
    render() {
        const {
                  recipeByFollowUser,
              }          = this.props.home
        const {
                  list,
              }          = this.props.recipe
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
        const {id} = this.props.match.params;
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
        user  : state.user,
        recipe: state.recipe,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))