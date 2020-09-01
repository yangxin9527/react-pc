import axios from 'axios'
import qs from 'qs'
import { message } from 'antd';
import store from "../store"
import history from "../history"

axios.defaults.timeout = 50000;
axios.defaults.baseURL = '/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.withCredentials = true;
let http = {
    post: "",
    get: ""
};

http.post = function (api, data,errorRemind=true,type="mobile") {
    let token = store.rootStore.token;
    if(token){
        data={
            token:token,
            ...data
        }
    }
    if(type==="pc"){
        api ='/index/'+api
    }else{
        api ='/api/'+api
    }
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.post(api, params).then((res) => {
            resolve(res.data);
            try{
                if(res.status===200){
                    if(errorRemind&&res.data&&res.data.code !== 200){
                        message.error(res.data.msg);
                        switch (res.data.code) {
                            case 410:
                                history.push("/login")
                                store.rootStore.updateUserInfo(null)
                                store.rootStore.updateToken()
                                break;
                            default:

                        }

                    }
                }else{
                    message.error('请求失败！请检查网络环境,稍后再试！ code:'+res.status);
                }
            }catch (e) {
                console.error(e)
            }

        }).catch(err => {
            resolve({
                code:"9999",
                msg:err
            });
            message.error('请求失败！请检查网络环境！ code:'+err,1);
        })
    })
};

http.get = function (api, data) {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.get(api, params).then((res) => {
            if(res.status===200){
                resolve(res.data)
            }else{
                message.error('请求失败！code:'+res.status);
            }
        }).catch(err => {
            reject(err)
        })
    })
};

export default http