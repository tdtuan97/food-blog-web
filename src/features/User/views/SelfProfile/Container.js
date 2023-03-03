import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {
    getIngredientBySeason,
    getRecipeAll,
    getRecipeByFollowUser, getRecipeIngredient,
    getRecipePopular
} from "@features/Home/redux/actions";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredientSelected: null,
        }
    }

    /**
     * On select badge
     * @param e
     */
    onSelectedIngredient = (e) => {
        let id                   = e.currentTarget.dataset.id ?? null
        id                       = id ? id : null
        let {ingredientSelected} = this.state
        ingredientSelected       = ingredientSelected !== id ? id : null
        this.setState({
            ...this.state,
            ingredientSelected: ingredientSelected
        })
        if(ingredientSelected){
            this.props.getRecipeIngredient(ingredientSelected)
        }
        else{
            this.props.getRecipeAll();
        }
    }

    render() {
        const {
                  ingredientList,
                  recipeAll,
                  recipeByFollowUser,
                  recipeByPopular,
                  recipeByIngredient
              } = this.props.home

        const {ingredientSelected} = this.state
        return (
            <President
                ingredientList={ingredientList}
                recipeAll={recipeAll}
                recipeByFollowUser={recipeByFollowUser}
                recipeByPopular={recipeByPopular}
                recipeByIngredient={recipeByIngredient}

                ingredientSelected={ingredientSelected}
                onSelectedIngredient={this.onSelectedIngredient}
            />
        )
    }

    componentDidMount() {
        this.props.getIngredientBySeason();
        this.props.getRecipeAll();
        this.props.getRecipeByFollowUser();
        this.props.getRecipePopular();
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getIngredientBySeason: () => {
            dispatch(getIngredientBySeason());
        },

        getRecipeAll: () => {
            dispatch(getRecipeAll());
        },

        getRecipeByFollowUser: () => {
            dispatch(getRecipeByFollowUser());
        },

        getRecipePopular: () => {
            dispatch(getRecipePopular());
        },

        getRecipeIngredient: (ingredient) => {
            dispatch(getRecipeIngredient(ingredient));
        },
    };
}

function mapStateToProps(state) {
    return {
        home: state.home
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)