import React, {Component} from 'react';
import {Avatar} from "antd";
import helpers from "@ultis/helpers";
import {Link, withRouter} from "react-router-dom";
import BadgeImageDefault from "@images/recipe-default.jpg";
import {UserOutlined} from "@ant-design/icons";

class UserLabel extends Component {
    render() {
        const user = this.props.user;
        return (
            <div className="user-block">
                <div className="label-user">
                    <div className="user-information">
                        <div className="left">
                            {
                                helpers.generateFullImage(user.avatar) ?
                                    <Avatar
                                        size={80}
                                        src={<img
                                            src={helpers.generateFullImage(user.avatar)}
                                            alt=""/>}
                                    /> : <Avatar
                                        size={80}
                                        icon={<UserOutlined/>}
                                    />
                            }
                        </div>
                        <div className="right">
                            <Link to={`/user/${user.userId}`} className="label">{user.fullName}</Link>
                            <div className="email">{user.email}</div>
                            {
                                user.introduce ? <div className="introduce">
                                    {user.introduce}
                                </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserLabel)