import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {
    getRecipeByFollowUser,
} from "@features/Home/redux/actions";
import {getUser} from "@features/User/redux/actions";
import {reset} from "@common/crud";
import helpers from "@ultis/helpers";
import {getListRecipeManagement} from "@features/ListRecipe/redux/actions";

class Container extends Component {
    render() {
        const {
                  recipeByFollowUser,
              }  = this.props.home
        const {
                  list,
              }  = this.props.listRecipe
        let user = this.props.user.user.data ?? {}

        return (
            <President
                listRecipe={list}
                recipeByFollowUser={recipeByFollowUser}
                user={user}
            />
        )
    }

    componentDidMount() {
        const id = helpers.getAuthUserId();
        this.props.getRecipeByFollowUser();
        this.props.getListRecipeManagement(id);
        this.props.getUser(id);
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
    };
}

function mapStateToProps(state) {
    return {
        home  : state.home,
        auth  : state.auth,
        listRecipe: state.listRecipe,
        user  : state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)