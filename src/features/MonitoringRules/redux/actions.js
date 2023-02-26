import {apiGet, apiPost} from "@common/crud";
import * as CONSTANTS from "./constants";
import {apiDelete} from "@common/crud/actions";

/**
 * Get rule
 * @param params
 * @returns
 */
export function getRules(params = {}) {
    let {plantId} = params
    return dispatch => {
        dispatch(getRulesLoadingAction())
        dispatch(apiGet(`rules`, {
            "plantId": plantId ?? ""
        }, {}, getRulesAction))
    };
}

function getRulesAction(response) {
    return {
        type   : CONSTANTS.GET_RULE_LIST,
        payload: response
    };
}

function getRulesLoadingAction() {
    return {
        type   : CONSTANTS.GET_RULE_LIST_LOADING,
        payload: null
    };
}

/**
 * Get rule
 * @param id
 * @returns
 */
export function getRule(id) {
    return dispatch => {
        id = id ?? ""
        dispatch(getRuleLoadingAction())
        dispatch(apiGet(`rules/${id}`, {}, {}, getRuleAction))
    };
}

function getRuleAction(response) {
    return {
        type   : CONSTANTS.GET_RULE_DETAIL,
        payload: response
    };
}

function getRuleLoadingAction() {
    return {
        type   : CONSTANTS.GET_RULE_DETAIL_LOADING,
        payload: null
    };
}

/**
 * Create rule
 * @param params
 * @returns
 */
export function createRule(params) {
    return dispatch => {
        dispatch(createRuleLoadingAction())
        dispatch(apiPost(`rules/`, params, {}, createRuleAction))
    };
}

function createRuleAction(response) {
    return {
        type   : CONSTANTS.CREATE_RULE,
        payload: response
    };
}

function createRuleLoadingAction() {
    return {
        type   : CONSTANTS.CREATE_RULE_LOADING,
        payload: null
    };
}
/**
 * Get rule
 * @param id
 * @param params
 * @returns
 */
export function updateRule(id, params) {
    id = id ?? ""
    return dispatch => {
        dispatch(updateRuleLoadingAction())
        dispatch(apiPost(`rules/${id}`, params, {}, updateRuleAction))
    };
}

function updateRuleAction(response) {
    return {
        type   : CONSTANTS.UPDATE_RULE,
        payload: response
    };
}

function updateRuleLoadingAction() {
    return {
        type   : CONSTANTS.UPDATE_RULE_LOADING,
        payload: null
    };
}

/**
 * Get rule
 * @param id
 * @returns
 */
export function deleteRule(id) {
    id = id ?? ""
    return dispatch => {
        dispatch(deleteRuleLoadingAction())
        dispatch(apiDelete(`rules/${id}`, {}, deleteRuleAction))
    };
}

function deleteRuleAction(response) {
    return {
        type   : CONSTANTS.DELETE_RULE,
        payload: response
    };
}

function deleteRuleLoadingAction() {
    return {
        type   : CONSTANTS.DELETE_RULE_LOADING,
        payload: null
    };
}

/**
 * Get meta conditions
 * @param plantId
 * @returns
 */
export function getMetaConditions(plantId = null) {
    return dispatch => {
        dispatch(getMetaConditionsLoadingAction())
        dispatch(apiGet('rule-conditions', {
            "plantId": plantId ?? ""
        }, {}, getMetaConditionsAction))
    };
}
function getMetaConditionsAction(response) {
    return {
        type   : CONSTANTS.GET_META_CONDITIONS,
        payload: response
    };
}
function getMetaConditionsLoadingAction() {
    return {
        type   : CONSTANTS.GET_META_CONDITIONS_LOADING,
        payload: null
    };
}

/**
 * Clear form rule
 * @returns {{payload: null, type: string}}
 */
export function clearFormRule() {
    return {
        type   : CONSTANTS.CLEAR_FORM_RULE,
        payload: null
    };
}