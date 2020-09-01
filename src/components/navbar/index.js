import React,{Component} from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import './index.less';
import {inject, observer} from "mobx-react";




@inject("rootStore")
@observer
class NavBar extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render(){
        return <div className="nav-bar-wrap">
            <div className="nav-bar">
                <nav>
                    <NavLink className="nav-link" to={"/home"} activeClassName={"on"}>首页</NavLink>
                    <NavLink className="nav-link" to={"/test"} activeClassName={"on"}>test</NavLink>
                    <NavLink activeClassName={"on"} to={"/user"} className="nav-link">个人中心</NavLink>
                </nav>
            </div>
        </div>
    }
}

export default withRouter(NavBar)
