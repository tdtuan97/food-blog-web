import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {withRouter} from "react-router-dom";
import {reset} from "@common/crud";
import {getListRecipe, updateListRecipe} from "@features/ListRecipe/redux/actions";

class Container extends Component {
    onClickUpdate = (data) => {
        const {id} = this.props.match.params;
        this.props.updateListRecipe(id, data)
    }

    render() {
        const {
                  update
              } = this.props.listRecipe

        return (
            <President
                update={update}
                onClickUpdate={this.onClickUpdate}
            />
        )
    }

    componentWillUnmount() {
        this.props.reset()
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getListRecipe(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let currentPostComment = this.props.listRecipe.postComment
        let prevPostComment    = prevProps.listRecipe.postComment

        //console.log(currentPostComment)
        //console.log(prevPostComment)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getListRecipe: (id) => {
            dispatch(getListRecipe(id));
        },

        reset: () => {
            dispatch(reset());
        },

        updateListRecipe: (id, data) => {
            dispatch(updateListRecipe(id, data));
        },
    };
}

function mapStateToProps(state) {
    return {
        listRecipe: state.listRecipe
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))