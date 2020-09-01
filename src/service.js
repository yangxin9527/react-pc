// import http from './utils/http'
// import store from './store'



export default {

    login(data){
        return new Promise((resolve => {
            resolve({
                code:200,
                data:{
                    token:"12ddddddddddddddddddddddd"
                }
            })
        }))
        // return http.post('login/dologin',data);
    },

    getUserInfo(data={}){
        return new Promise((resolve => {
            resolve({
                code:200,
                data:{
                    nickname:"test",
                    id:110,
                }
            })
        }))
        // return http.post('getUserInfo',{
        //     ...data
        // });
    },
    getCaptcha(data){
        return new Promise((resolve => {
            resolve({
                code:200,
                data:"",
                msg:"发送短信成功"
            })
        }))
        // return http.post('getCaptcha',{
        //     ...data
        // })
    },


    logOut(){
        return new Promise((resolve => {
            resolve({
                code:200,
                data:"",
                msg:"成功"
            })
        }))
        // return http.post('login/loginout', {});
    },

}
