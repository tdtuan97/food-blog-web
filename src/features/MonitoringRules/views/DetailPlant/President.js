import React, {Component} from 'react';
import * as Components from "../../components";
import {ModalConfirm} from "@layouts";

class President extends Component {
    render() {
        const {
                  isVisibleFormDetail,
                  onClickNewRule,
                  onClickEditRule,
                  onSubmitRule,
                  onCloseRule,

                  isVisibleDeleteConfirm,
                  onShowConfirmDelete,
                  onCloseConfirmDelete,
                  onAcceptDelete,
              } = this.props
        return (
            <div className="features feature-home">
                <h1 className="page-title">
                    Monitoring Rules
                </h1>
                <div>
                    <Components.RuleList
                        onClickNewRule={onClickNewRule}
                        onClickEditRule={onClickEditRule}

                        onShowConfirmDelete={onShowConfirmDelete}
                    />

                    <Components.RuleForm
                        isVisibleFormDetail={isVisibleFormDetail}
                        onSubmitRule={onSubmitRule}
                        onCloseRule={onCloseRule}
                    />

                    <ModalConfirm
                        onOk={onAcceptDelete}
                        onCancel={onCloseConfirmDelete}
                        visible={isVisibleDeleteConfirm}
                        message="Delete this rule ?"
                    />
                </div>
            </div>
        );
    }
}

export default President;
