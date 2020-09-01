import url from "url";
import history from '../history';
export function getUrlParams(search= history.location.search){
    return url.parse(search, true).query
}

