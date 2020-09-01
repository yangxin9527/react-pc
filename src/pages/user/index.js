import React, {Component} from "react";
import TopBar from "../../components/topbar";
import {NavLink, Switch, Redirect,} from "react-router-dom";
import {RouteWithSubRoutes} from "../../Router"
import "./index.less";
import Footer from "../../components/footer";
import {inject, observer} from "mobx-react";
import NavBar from "../../components/navbar";

export default
@inject("rootStore")
@observer
class User extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }


    render() {
        let show = true;
        let routes = this.props.routes;
        routes.map((item)=>{
            if (item.path === this.props.location.pathname ) {
                show = !item.hideAside
            }
        });
        return <div className="user-layout-wrap">
            <TopBar/>
            <NavBar/>
            <div className="user-layout">
                {show && <div className="user-aside">
                    <NavLink to="/user/userInfo" activeClassName="on">我的</NavLink>
                    <NavLink to="/user/addGoods" activeClassName="on">发布商品</NavLink>

                </div>}
                <div className="user-container">
                    <Switch>
                        {this.props.routes.map((route, i) => {
                            return (
                                <RouteWithSubRoutes key={i} {...route} />
                            )
                        })}
                        <Redirect
                            to={{
                                pathname: "/user/userInfo"
                            }}
                        />
                    </Switch>
                </div>
            </div>

            <Footer/>
        </div>
    }
}
