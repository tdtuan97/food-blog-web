import React, {Component} from 'react';
import {Avatar, Dropdown, Input, Menu} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {Logo} from "../Logo";
import logoUrl from "@images/logo.png"
import img_user from "@images/user.png"
import helpers from "@ultis/helpers";

class President extends Component {

    redirectToAccount=()=> {
        this.props.history.push(`/account`)
    }

    redirectToProfile=()=> {
        this.props.history.push(`/profile`)
    }

    render() {
        const {
                  auth,
                  common,
                  handleToggleSider,
                  handleLogout,
              }              = this.props
        const siderCollapsed = common.siderCollapsed
        const classBtnToggle = siderCollapsed ? 'action-control close' : 'action-control'
        const classLogo      = siderCollapsed ? 'logo close' : 'logo'

        let pathName          = this.props.router.location.pathname
        const classItem       = "menu-item";
        const classItemActive = "menu-item active";
        const classHeader     = this.props.isTransparent === true ? "header transparent" : "header";

        // Auth
        //const authenticated = auth.id !== undefined && auth.id !== null;
        const authenticated = true;
        let {
                avatar,
                fullName,
            } = auth.authUser

        return (
            <header className="page-header">
                <div className="page-header-content">
                    {/*<div className={classBtnToggle}>
                        <AntButton
                            className="btn-main-default"
                            type="text"
                            icon={<MenuOutlined/>}
                            onClick={handleToggleSider}
                        />
                    </div>*/}

                    <div className="page-header-control">
                        <div className={classLogo}>
                            <Link to="/">
                                <Logo src={logoUrl}/>
                            </Link>
                        </div>
                        <div className="search-input">
                            <Input
                                placeholder="Gõ nguyên liệu để tìm kiếm"
                                bordered={false}
                                //onSearch={onSearch}
                            />
                        </div>
                        {/*<div className="status-control">
                            <div className="group-status">
                                <Link
                                    to={'/recipe'}
                                    className="group-label"
                                >
                                    Management
                                </Link>
                            </div>
                        </div>*/}
                        <div className="header-menu">
                            <ul className="menu-content">
                                <li className={pathName === "/" ? classItemActive : classItem}>
                                    <Link to="/">Home</Link>
                                </li>
                                <li className={pathName === "/recipe" ? classItemActive : classItem}>
                                    <Link to="/recipe">Management</Link>
                                </li>
                                <li className={pathName === "/contact" ? classItemActive : classItem}>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li className={pathName === "/about" ? classItemActive : classItem}>
                                    <Link to="/about">About</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="header-menu auth-menu">
                            {
                                authenticated ?
                                    (
                                        <Dropdown className="menu-content" overlay={
                                            <Menu>
                                                <Menu.Item onClick={this.redirectToAccount}>
                                                    Tài khoản
                                                </Menu.Item>
                                                <Menu.Item onClick={this.redirectToProfile}>
                                                    Thông tin cá nhân
                                                </Menu.Item>
                                                <Menu.Divider/>
                                                <Menu.Item onClick={handleLogout}>
                                                    Logout
                                                </Menu.Item>
                                            </Menu>
                                        }>
                                            <Link to={''}>
                                                <Avatar className="avatar" src={helpers.generateFullImage(avatar) ?? img_user}/>
                                                <span className="full-name">{fullName}</span>
                                            </Link>
                                        </Dropdown>
                                    )
                                    : null
                                /*<ul className="menu-content">
                                    <li className="menu-item">
                                        <Link to='/login'>Login</Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link to="/register">Register</Link>
                                    </li>
                                </ul>*/
                            }
                        </div>
                    </div>


                </div>
            </header>
        )
    }
}

export default withRouter(President)