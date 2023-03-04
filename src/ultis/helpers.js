import moment from 'moment';

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

    getNow: function (format = 'HH:mm:ss') {
        return moment().format(format);
    },

    redirectForce: function (url, isBlank = false) {
        isBlank ? window.open(url, '_blank') : window.open(url)
    },
}
export default helpers;
