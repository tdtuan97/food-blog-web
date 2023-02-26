import React, {Component} from 'react';
import {
    MenuOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import {Link} from "react-router-dom";
import {Logo} from "../Logo";
import {AntButton} from "../AntButton";
import logoUrl from "@images/logo.png"

class President extends Component {
    render() {
        const {
                  common,
                  handleToggleSider
              } = this.props
        const siderCollapsed = common.siderCollapsed
        const classBtnToggle = siderCollapsed ? 'action-control close' : 'action-control'
        const classLogo = siderCollapsed ? 'logo close' : 'logo'

        return (
            <header className="page-header">
                <div className="page-header-content">
                    <div className={classBtnToggle}>
                        <AntButton
                            className="btn-main-default"
                            type="text"
                            icon={<MenuOutlined/>}
                            onClick={handleToggleSider}
                        />
                    </div>
                    <div className={classLogo}>
                        <Link to="/">
                            <Logo src={logoUrl}/>
                        </Link>
                    </div>
                    <div className="page-header-control">
                        <div className="search-input">
                            <Input
                                placeholder="Gõ nguyên liệu để tìm kiếm"
                                bordered={false}
                                //onSearch={onSearch}
                            />
                        </div>
                        <div className="status-control">
                            {/*<div className="group-status">
                                <span className="group-label"><ThunderboltFilled/></span>
                                <span className="group-item highlight"><WifiOutlined/></span>
                                <span className="group-item highlight"><LineOutlined/></span>
                                <span className="group-item highlight"><LineOutlined/></span>
                            </div>*/}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default President;