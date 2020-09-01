import React, {Component} from "react";
import "./transfre.less"
import TopBar from "../../../components/topbar";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Button} from "antd";
import NavBar from "../../../components/navbar";
import Footer from "../../../components/footer";


@inject("rootStore")
@observer
class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: {}
        }
    }
    getUserInfo(index) {
        this.props.rootStore.getUserInfo().then((res)=>{
            if(res.code===200){
                this.props.history.push("/user")
            }
        })
    }

    render() {

        return <div className="transfer-wrap">
            <TopBar/>
            <NavBar/>
            <div className="transfer">
                <Button onClick={()=>{this.getUserInfo()}}>获取user</Button>

            </div>
            <Footer/>
        </div>
    }
}

export default withRouter(Transfer)
