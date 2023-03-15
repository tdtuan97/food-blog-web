import { followUser, unfollowUser } from '@src/features/User/redux/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Container extends Component {
    onClickFollow = () => {
        this.props.followUser(this.props.id)
    }

    onClickUnfollow = () => {
        this.props.followUser(this.props.id)
    }

    componentDidUpdate(prevProps) {
        let {
            id,
            callBackRefresh
        } = this.props

        let currentFollow = this.props.user.follow
        let prevFollow = prevProps.user.follow

        let currentUnfollow = this.props.user.unfollow
        let prevUnfollow = prevProps.user.unfollow

        if (currentFollow.data !== prevFollow.data) {
            if (callBackRefresh) {
                callBackRefresh(id)
            }
        }

        if (currentUnfollow.data !== prevUnfollow.data) {
            if (callBackRefresh) {
                callBackRefresh(id)
            }
        }
    }

    render() {
        let {
            isFollow,
        } = this.props
        return (
            <div>
                {
                    isFollow ?
                        <AntButton
                            className="btn-follow"
                            onClick={this.onClickUnfollow}
                            type="dashed"
                        >
                            Bỏ theo dõi
                        </AntButton>
                        : <AntButton
                            type="dashed"
                            className="btn-follow"
                            onClick={this.onClickFollow}
                        >
                            Theo dõi
                        </AntButton>
                }
            </div>
        )
    }

    componentDidUpdate() {

    }
}

function mapDispatchToProps(dispatch) {
    return {
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
        router: state.router,
        auth: state.auth,
        common: state.common,
        user: state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)