import React from "react"
import {Link} from "react-router-dom";

export default class Test extends React.Component{
    state={

    }
    static getDerivedStateFromProps(nextProps,prevState){
        //该方法内禁止访问this
        console.log(nextProps.history.search)
        if(nextProps.email !== prevState.email){
            //通过对比nextProps和prevState，返回一个用于更新状态的对象
            return {
                value:nextProps.email
            }
        }
        //不需要更新状态，返回null
        return null
    }
    render() {
        return(<div>
            test
            <ul>
                <li>
                    <Link to={"/test/?test=1"}>test1</Link>
                </li>
                <li>
                    <Link to={"/test/?test=2"}>test2</Link>
                </li>
            </ul>
        </div>)
    }
}