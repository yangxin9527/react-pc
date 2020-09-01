import React, {Component} from "react";
import "./index.less"
import {inject, observer} from "mobx-react";
import rootStore from "../../../store/rootStore";


@inject("rootStore")
@observer
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const rootStore = this.props.rootStore;
        const user = rootStore.user;
        if (!user) {
            return null
        }
        return <div className="user-info">
            <div className="user-info-detail">
                    个人信息
            </div>
        </div>
    }
}

export default UserInfo
