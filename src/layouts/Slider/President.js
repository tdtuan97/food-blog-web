import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {
    DashboardOutlined,
    DeploymentUnitOutlined,
    DollarCircleOutlined,
    LogoutOutlined,
    UserOutlined,
    ToolOutlined,
    TagsOutlined,
    SettingOutlined,
    SlidersOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {AntAvatar} from "../AntAvatar";

class President extends Component {
    renderMenuItems = (routes) => {
        const {
                  technicalMonitoringRoute,
                  miniScadaRoute,
                  assetPerformanceRoute,
                  analysisRoute,
                  reportRoute,
                  billingRoute,
                  ticketsManagementRoute,
                  monitoringRulesRoute,
                  billingConfigurationsRoute,
                  portfolioConfigurationsRoute,
              } = routes
        return [
            getItem(<Link to={'/'}>Homepage</Link>, 'Homepage',
                <DashboardOutlined/>),
            /*getItem(<Link to={miniScadaRoute}>Mini SCADA</Link>, miniScadaRoute,
                <SlidersOutlined/>),
            getItem(<Link to={assetPerformanceRoute}>Asset Performance</Link>, assetPerformanceRoute,
                <DeploymentUnitOutlined/>),
            getItem(<Link to={billingRoute}>Billing</Link>, billingRoute,
                <DollarCircleOutlined/>),
            getItem('Tools', 'tools', <ToolOutlined/>, [
                getItem(<Link to={analysisRoute}>Analysis</Link>, analysisRoute),
                getItem(<Link to={reportRoute}>Report</Link>, reportRoute),
            ]),
            getItem(<Link to={ticketsManagementRoute}>Tickets Management</Link>, ticketsManagementRoute,
                <TagsOutlined/>),
            getItem('Configurations', 'configurations', <SettingOutlined/>, [
                getItem(<Link to={monitoringRulesRoute}>Monitoring Rules</Link>, monitoringRulesRoute),
                getItem(<Link to={billingConfigurationsRoute}>Billing
                    Configurations</Link>, billingConfigurationsRoute),
                getItem(<Link to={portfolioConfigurationsRoute}>Portfolio
                    Configurations</Link>, portfolioConfigurationsRoute),
            ]),*/
        ];
    }

    renderUserMenuItems = (params) => {
        const {fullName, collapsed, randomAvatar, handleLogout} = params;
        return [
            {
                type: "divider", // Must have
            },
            {
                type    : "group", // Must have
                key     : "account",
                label   : <div className={collapsed ? "sub-collapsed" : ""}><UserOutlined/> Account</div>,
                children: [
                    getItem(fullName, "account-user", <AntAvatar
                        alt={fullName}
                        icon={<UserOutlined/>}
                        size="small"
                        src={randomAvatar}
                    />),
                    getItem(<div onClick={handleLogout}>Logout</div>, "account-logout", <LogoutOutlined/>),
                ],
            },
        ];
    }

    render() {
        const {
                  router,
                  common,
                  auth,
                  match,
                  randomAvatar,
                  handleLogout
              } = this.props;

        const pathname          = router.location.pathname;

        // Layout
        const collapsed = common.siderCollapsed;

        // Auth
        const {user}    = auth;
        const full_name = user.name;

        let selectDefault;
        let openDefault;


        // Render open default && select default
        switch (true) {
            //case pathname === "/" || pathname.indexOf(technicalMonitoringRoute) !== -1:
            //    selectDefault = technicalMonitoringRoute
            //    break;
            //case pathname.indexOf(miniScadaRoute) !== -1:
            //    selectDefault = miniScadaRoute
            //    break;
            default:
                break;
        }

        return (
            <Layout.Sider
                className="left-slider"
                width={208}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >

                {/* <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />*/}
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[selectDefault]}
                    defaultOpenKeys={collapsed ? [] : [openDefault]}
                    selectable={true}
                    items={this.renderMenuItems({
                        "technicalMonitoringRoute"    : "",
                        "miniScadaRoute"              : "",
                        "assetPerformanceRoute"       : "",
                        "analysisRoute"               : "",
                        "reportRoute"                 : "",
                        "billingRoute"                : "",
                        "ticketsManagementRoute"      : "",
                        "monitoringRulesRoute"        : "",
                        "billingConfigurationsRoute"  : "",
                        "portfolioConfigurationsRoute": "",
                    })}
                />
                <Menu
                    className={"menu-account " + (collapsed ? "sub-collapsed" : "")}
                    mode="inline"
                    selectable={false}
                    defaultOpenKeys={collapsed ? [] : ['account']}
                    items={this.renderUserMenuItems({
                        fullName    : full_name,
                        collapsed   : collapsed,
                        randomAvatar: randomAvatar,
                        handleLogout: handleLogout,
                    })}
                />
            </Layout.Sider>
        )
    }
}

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export default President;