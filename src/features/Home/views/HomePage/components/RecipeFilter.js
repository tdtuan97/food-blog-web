import React, { Component } from 'react';
import { RecipeCard } from "./";
import { DataEmpty } from "@layouts";
import { Col, Row, Avatar } from 'antd';

import BadgeImageDefault from "@images/recipe-default.jpg"
import { UserOutlined } from '@ant-design/icons';

class RecipeFilter extends Component {
    render() {
        const { filterItems, title } = this.props
        return (
            <div className="recipe-filter">
                <div className="title">
                    {title}
                </div>
                <div className="items">
                    <Row gutter={12}>
                        {
                            (filterItems.length ?
                                filterItems.map((item, i) => {
                                    return (
                                        <Col span={3} key={i}>
                                            <div className="badge-selections">
                                                <div className="badge-icon">
                                                    <Avatar
                                                        size="small"
                                                        icon={<UserOutlined />}
                                                        src={<img src={BadgeImageDefault} alt="avatar" />}
                                                    />
                                                </div>
                                                <div className="badge-text">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }) : <DataEmpty />)
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default RecipeFilter;