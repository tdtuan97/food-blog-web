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
        let userId = localStorage.getItem('authUserId') ?? null
        if (userId){
            this.props.getRecipeManagement(userId);
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipeManagement: (userId) => {
            dispatch(getRecipeManagement(userId));
        },
    };
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)