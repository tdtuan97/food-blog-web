import React, {Component} from 'react';
import {AntButton, DataEmpty} from "@layouts";
import {Col, Row, Avatar} from 'antd';

import BadgeImageDefault from "@images/recipe-default.jpg"
import {CheckCircleFilled} from '@ant-design/icons';

class RecipeFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        }
    }

    /**
     * On select badge
     * @param e
     */
    onSelectBadge = (e) => {
        let id         = e.currentTarget.dataset.id ?? null
        id             = id ? parseInt(id) : null
        let {selected} = this.state
        const idx      = selected.indexOf(id);
        if (idx !== -1) {
            selected.splice(idx, 1);
        } else {
            selected.push(id)
        }
        this.setState({
            ...this.state,
            selected: selected
        })
    }

    render() {
        const {filterItems, title} = this.props
        const {selected}           = this.state;

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
                                            <div
                                                className={"badge-selections" + (selected.indexOf(item.id) !== -1 ? " selected" : "")}
                                                onClick={this.onSelectBadge}
                                                data-id={item.id}
                                            >
                                                <div className="badge-icon">
                                                    {
                                                        selected.indexOf(item.id) !== -1 ?
                                                            <Avatar
                                                                size="small"
                                                                icon={<CheckCircleFilled style={{color: "#23b123"}}/>}
                                                            />
                                                            :
                                                            <Avatar
                                                                size="small"
                                                                src={<img src={BadgeImageDefault} alt="avatar"/>}
                                                            />
                                                    }
                                                </div>
                                                <div className="badge-text">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }) : <DataEmpty/>)
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default RecipeFilter;