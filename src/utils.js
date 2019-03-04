import fetch from 'cross-fetch';
import { API_KEY, YANDEX_API_URL } from "./config";

export function yandexTrCall(url, method='GET', params=undefined) {

    let fullUrl = `${YANDEX_API_URL}${url}?key=${API_KEY}`;
    let options = {
        "method": method
    }

    if(params) {
        let paramsStr = Object.keys(params).map((key)=> {
            let values = params[key];
            if(typeof params[key] === "string"){
                values = [values]
            }
            return values.map(val => `${key}=${encodeURI(val)}`)
        }).flat().join('&');
        if(method === 'GET') {
            fullUrl += '&' + paramsStr;
        } else if(method === 'POST') {
            options['body'] = paramsStr;
            options['headers'] = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    }

    return fetch(fullUrl, options);
}