import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';
import {getRecipe, getRecipeComments, postRecipeComment} from "@features/Recipe/redux/actions";
import {withRouter} from "react-router-dom";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: "",
        }
    }

    /**
     * On change comment
     * @param value
     */
    onChangeComment = (value) => {
        this.setState({
            ...this.state,
            commentText: value.currentTarget.value
        })
    }

    /**
     * Submit comment
     */
    onSubmitComment = () => {
        let value = this.state.commentText
        if (value && value !== "") {
            const {id} = this.props.match.params;
            this.setState({
                ...this.state,
                commentText: ""
            }, function () {
                this.props.postRecipeComment(id, value)
            })
        }
    }

    render() {
        const {
                  detail,
                  comments
              } = this.props.recipe

        const {commentText} = this.state
        return (
            <President
                detail={detail}
                comments={comments}
                commentText={commentText}
                onChangeComment={this.onChangeComment}
                onSubmitComment={this.onSubmitComment}
            />
        )
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getRecipe(id)
        this.props.getRecipeComments(id)
    }

    componentDidUpdate(prevProps) {
        let currentPostComment = this.props.recipe.postComment
        let prevPostComment = prevProps.recipe.postComment

        //console.log(currentPostComment)
        //console.log(prevPostComment)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipe: (id) => {
            dispatch(getRecipe(id));
        },

        getRecipeComments: (id) => {
            dispatch(getRecipeComments(id));
        },

        postRecipeComment: (id, value) => {
            dispatch(postRecipeComment(id, value));
        },
    };
}

function mapStateToProps(state) {
    return {
        recipe: state.recipe
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))