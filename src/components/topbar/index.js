import React,{Component} from "react";
import {Link,withRouter} from "react-router-dom"
import './index.less';
import {inject, observer} from "mobx-react";


@inject("rootStore")
@observer
class TopBar extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render(){
        return <div className="top-bar-wrap">
            <div className="top-bar">
                <div className="top-bar_left">
                    {!this.props.rootStore.token?<Link to="/login" >登录 </Link>:<a onClick={()=>{
                        this.props.rootStore.logOut();
                        this.props.history.push("/")
                    }}>退出登录</a>}
                </div>

            </div>
        </div>
    }
}

export default withRouter(TopBar)
