import React,{Component} from "react";
import "./index.less"
import {Link} from "react-router-dom";
import Footer from "../../components/footer"
import {Button, Checkbox, message} from "antd"
import service from "../../service";
import {inject, observer} from "mobx-react"
import TopBar from "../../components/topbar";
import NavBar from "../../components/navbar";

@inject("rootStore")
@observer
class Login extends Component{
    phoneInput = React.createRef();
    passwordInput= React.createRef();
    codeInput= React.createRef();
    constructor(props) {
        super(props);
        this.state={
            type:2,
            checked:false,
            count:0,
            loading:false
        }
    }
    componentDidMount() {
        let state = this.props.history.location.state;
        if(state&&state.from){
            message.info("请登录")
        }
    }

    changeType(type){
        this.setState({
            type
        })
    }
    componentWillUnmount() {
        if(this.timer){
            clearInterval(this.timer)
        }
    }

    getCaptcha(){
        const tel = this.phoneInput.current.value;
        if(!tel){
            message.error("请填写电话号码");
            return;
        }else if(!new RegExp(/^[0-9]{11}$/).test(tel)){
            message.error("请填写正确的电话号码");
            return;
        }

        this.setState({
            count:60
        })
        service.getCaptcha({tel}).then((res)=>{
            if(res.code!==200){
                this.setState({
                    count:0
                });
                if(this.timer){
                    clearInterval(this.timer)
                }
            }
        })
        this.timer = setInterval(()=>{
            if(this.state.count>0){
                this.setState({
                    count:this.state.count-1
                })
            }else{
                this.setState({
                    count:0
                })
            }

        },1000)

    }
    onChangeCheckbox(e) {
        this.setState({
            checked:e.target.checked
        })
    }
    async onSubmit(){

        if(this.state.checked){

            const tel = this.phoneInput.current.value;
            const userpass = this.passwordInput.current?this.passwordInput.current.value:"";
            const code = this.codeInput.current?this.codeInput.current.value:"";
            const type = this.state.type;
            if(!tel){
                message.error("请填写电话号码");
                return;
            }else if(!new RegExp(/^[0-9]{11}$/).test(tel)){
                message.error("请填写正确的电话号码");
                return;
            }
            let loginData;

            if(type===2){
                if(!userpass){
                    message.error("请填写密码")
                    return;
                }
                this.setState({
                    loading:true
                })
                loginData = await service.login({
                    tel,
                    userpass,
                    type
                })
            }else{
                if(code===""){
                    message.error("请填写验证码")
                }
                this.setState({
                    loading:true
                })
                loginData = await service.login({
                    tel,
                    code,
                    type
                })
            }
            this.setState({
                loading:false
            })
            if(loginData.code===200){
                message.success("登录成功");
                let token =loginData.data.token;
                localStorage.setItem("token",token);
                localStorage.setItem("tel",tel);
                this.props.rootStore.updateToken(token);
                // this.props.rootStore.getUserInfo();
                this.props.history.push('/user/transfer');
            }
        }else{
            message.error("请勾选 同意平台服务协议和隐私政策")
        }

    }
    onKeyDown(e) {
        if(e.keyCode === 13){
            if(!this.state.loading){
                this.onSubmit();
            }
        }
    }
    render(){
        return <div >
            <TopBar/>
            <NavBar/>
            <div className="login-wrap">
                <div className="login-form-wrap">
                    <div className="login-form">
                        <div className="tab">
                            <div onClick={()=>{this.changeType(1)}} className={this.state.type===1?"on":""}>短信登录 <i className="icon-bar"></i></div>
                            <div onClick={()=>{this.changeType(2)}} className={this.state.type===2?"on":""}>密码登录 <i className="icon-bar"></i></div>
                        </div>
                        <div className="item-wrap">
                            <i className="icon icon-phone"></i>
                            <input ref={this.phoneInput} type="text" placeholder="请输入手机号" onKeyDown={e=> this.onKeyDown(e)} />
                        </div>
                        {this.state.type===2?<div className="item-wrap">
                            <i className="icon icon-code"></i>
                            <input type="password" ref={this.passwordInput} onKeyDown={e=> this.onKeyDown(e)}  placeholder="请输入密码" />
                        </div>:<div className="item-wrap">
                            <i className="icon icon-code"></i>
                            <input type="text" ref={this.codeInput} className="code-input" onKeyDown={e=> this.onKeyDown(e)} placeholder="请输入验证码" />
                            <button disabled={this.state.count} onClick={()=>{
                                this.getCaptcha()
                            }} className={this.state.count===0?"btn-get-code":"btn-get-code disabled"}>获取验证码 {this.state.count>0?this.state.count:""}</button>
                        </div>}
                        <Button loading={this.state.loading} className="login-btn" onClick={()=>this.onSubmit()}>登录</Button>
                        <Checkbox className="login-tips" checked={this.state.checked} onChange={(e)=>{this.onChangeCheckbox(e)}}>
                            <span className="login-tips-span"> 登录即代表您同意 <a href="/">平台服务协议</a> 和 <a href="/">隐私政策</a></span>
                        </Checkbox>
                        <p className="login-footer">
                            <Link to="/register">免费注册</Link>
                            <Link to="/forgotPassword">忘记密码</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    }
}

export default Login
