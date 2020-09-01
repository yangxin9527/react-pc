import {observable, action, computed} from 'mobx'
import service from "../service";
export default class RootStore {

    @observable token = localStorage.getItem("token") ? localStorage.getItem("token") : ""
    @observable user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null

    @action
    updateToken(token="") {
        this.token = token;
        if(token){
           localStorage.setItem("token",token)
        }else{
            localStorage.removeItem("token")
        }
    }



    @action
    updateUserInfo(user=null) {
        if(user){
            this.user = {
                ...user,
            }
        }else{
            this.user = null;
            this.token = "";
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }

    }

    getUserInfo() {
        return service.getUserInfo().then((res) => {
            if (res.code === 200) {
                this.updateUserInfo(res.data)
                localStorage.setItem('user', JSON.stringify(res.data));
                return res
            }
        })
    }

    @computed
    get roleLabel() {
        switch (this.role) {
            case "1":
                return "1"
            case "2":
                return "2"
            case "3":
                return "3"
            case "4":
                return "4"
            default:
                return ""
        }
    }





    logOut(){
        service.logOut().then((res) => {
            if (res.code === 200||res.code===602) {
                this.updateUserInfo()
            }
        })
    }


}

