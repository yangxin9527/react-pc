import React,{Component} from "react";
import './index.less';
import {inject, observer} from "mobx-react";


export default
@inject("rootStore")
@observer
class Footer extends Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }


    render(){
        return <div className="footer-wrap">
            <div className="footer">
                <p>鄂ICP备xxxxxxxxxxx；</p>
                <p>COPYRIGHT © 2000 - 2020 ALL RIGHTS RESERVED.</p>
            </div>
        </div>
    }
}
