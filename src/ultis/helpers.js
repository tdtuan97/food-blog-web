import moment from 'moment';
import * as CONSTANTS from './constants'

const helpers = {
    getEndPointAPI: function () {
        return process.env.REACT_APP_API_ENDPOINT
    },

    generateFullImage: function (string){
        return string ? (process.env.REACT_APP_BASE_URL + string) : null;
    },

    getAuthUserId: function (){
        let userId = parseInt(localStorage.getItem('authUserId'));
        return userId ? parseInt(userId) : null;
    },

    formatCash: function (value, currency = 'VNĐ') {
        value = value.toString();
        return value.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        }) + ' ' + currency
    },

    getNow: function (format = 'HH:mm:ss') {
        return moment().format(format);
    },

    redirectForce: function (url, isBlank = false) {
        isBlank ? window.open(url, '_blank') : window.open(url)
    },

    trimChar: function (string, charToRemove) {
        while (string.charAt(0) === charToRemove) {
            string = string.substring(1);
        }

        while (string.charAt(string.length - 1) === charToRemove) {
            string = string.substring(0, string.length - 1);
        }

        return string;
    },

    getSiteIdByPlantId: function (plantId, sites) {
        let siteId = null;
        if (sites.length > 0) {
            sites.forEach(site => {
                let plantFind = site.plants.find(plant => plant.id === plantId)
                if (plantFind) {
                    siteId = site.id
                    return siteId;
                }
            })
        }

        return siteId
    },

    /**
     * Get random color
     **/
    getRandomColor: function () {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },

    /**
     * Calc percentage
     * @param partialValue
     * @param totalValue
     * @param fixNumber
     * @returns {number}
     */
    percentage: function (partialValue, totalValue, fixNumber = 0) {
        let result = (100 * partialValue) / totalValue;
        if (fixNumber > 0) {
            result = result.toFixed(fixNumber);
        }
        return result;
    },

    timestampFormat: function (timestamp, format = CONSTANTS.DEFAULT_FORMAT_DATETIME) {
        let object = moment(timestamp)
        return object.format(format);
    },

    cToF: function (celsius) {
        return celsius * 9 / 5 + 32;
    },

    fToC: function (fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    },

    hashCode: function (str) { // java String#hashCode
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return 100 * hash;
    },

    intToRGB: function (i) {
        let c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return "#" + "00000".substring(0, 6 - c.length) + c;
    },

    stringToColor: function (str) {
        return this.intToRGB(this.hashCode(str));
    }

}
export default helpers;
