import React from 'react';
import {Switch,Route,Redirect,Router} from "react-router-dom";
import history from './history'
import Home from "./pages/home";
import Login from "./pages/login/login";
import User from "./pages/user";
import Test from "./pages/test";
import MyComponent from "./pages/myComponent";
import UserInfo from "./pages/user/userInfo";
import Transfer from "./pages/user/certification/transfer";
import AddGoods from "./pages/user/goods/addGoods";
import {inject, observer} from "mobx-react";
import ScrollToTop from "./scrollTop"

const routes = [
    {
        path: "/home",
        component: Home
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/test",
        component: Test
    },
    {
        path: "/component",
        component: MyComponent
    },

    {
        path: "/user/transfer",
        component: Transfer,
        exact:true,
        needToken:true,
    },
    {
        path: "/user",
        component: User,
        routes: [
            {
                title:'个人中心',
                path: "/user/userInfo",
                component: UserInfo,
                auth:true,
            },
            {
                path: "/user/addGoods",
                component: AddGoods,
                title:'发布商品',
                auth:true,
            },
            {
                path: "/user/addGoods2",
                component: AddGoods,
                title:'发布商品(左侧边栏隐藏)',
                auth:true,
                hideSide:true
            },


        ]
    }
];

@inject("rootStore")
@observer
class APPRouter extends React.Component{

    render() {
        return (
            <Router history={history} >
                <ScrollToTop/>
                <Switch>
                    {routes.map((route, i) => {
                        return(<RouteWithSubRoutes key={i} {...route} />)
                    })}
                    <Redirect
                        to={{
                            pathname: "/home"
                        }}
                    />
                </Switch>
            </Router>
        );
    }
}
export default APPRouter
export function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => {
                if(route.needToken&&!localStorage.getItem("token")){
                    return(<Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location.pathname }
                        }}
                    />)
                }else if(route.auth&&!localStorage.getItem("user")){
                    return(<Redirect
                        to={{
                            pathname: "/user/transfer",
                            state: { from: props.location.pathname }
                        }}
                    />)
                }else{
                    return  <route.component {...props} routes={route.routes} />

                }
            }}
        />
    );
}
