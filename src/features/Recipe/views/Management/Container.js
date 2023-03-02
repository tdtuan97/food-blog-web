import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {getRecipeManagement} from "@features/Recipe/redux/actions";

class Container extends Component {
    render() {
        const {
                  list
              } = this.props.recipe

        return (
            <President
                list={list}
            />
        )
    }

    componentDidMount() {
        this.props.getRecipeManagement();
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeManagement: () => {
            dispatch(getRecipeManagement());
        },
    };
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)