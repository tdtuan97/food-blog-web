import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {getRecipe} from "@features/Recipe/redux/actions";
import {withRouter} from "react-router-dom";

class Container extends Component {
    render() {
        const {
                  detail,
              } = this.props.recipe

        return (
            <President
                detail={detail}
            />
        )
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getRecipe(id)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipe: (id) => {
            dispatch(getRecipe(id));
        },
    };
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))