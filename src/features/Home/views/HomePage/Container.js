import React, {Component} from 'react';
import {connect} from 'react-redux';
import President from './President';

class Container extends Component {
    render() {
        let home = this.props.home;
        return (
            <President/>
        )
    }

    componentDidMount() {
        //this.props.fetchUser();
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: () => {
            //dispatch(fetchUser());
        },
    };
}

function mapStateToProps(state) {
    return {
        home: state.home
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)