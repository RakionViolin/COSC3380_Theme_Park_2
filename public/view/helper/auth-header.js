export default function authHeader(token = '') {
    if(token === '')
        token =  localStorage.getItem("ThemeParkaccessToken");

    if (token) {
        return {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "https://theme-park-3380.herokuapp.com/*",
            'x-access-token': token,
            'Authorization' : 'Bearer '+token
        };
    } else {
        return {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "https://theme-park-3380.herokuapp.com/*",
        };
    }
}
