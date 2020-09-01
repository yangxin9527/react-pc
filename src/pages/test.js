import React from "react"
import {Link} from "react-router-dom";

export default class Test extends React.Component{
    state={
        search:"",
        data:"11",
        data2:"11",
        state:{}
    }
    static getDerivedStateFromProps(nextProps,prevState){

        if(nextProps.history.location.search !== prevState.search){
            //通过对比nextProps和prevState，返回一个用于更新状态的对象
            return {
                search:nextProps.history.location.search,
                state:nextProps.history.location.state
            }
        }
        //不需要更新状态，返回null
        return null
    }
    componentDidUpdate(prevProps,prevState) {
        // 典型用法（不要忘记比较 props）：
        console.log(prevState ,this.state)
        if (prevState.search !== this.state.search) {
            console.log("请求");
            this.setState({
                data2:"123"
            })
        }
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
                <li>
                    <Link to={{
                        pathname:"/test",
                        state:{
                            a:1,
                            b:2
                        }
                    }}>test  state</Link>
                </li>
            </ul>
            <h1>
                search:{this.state.search}
            </h1>
            <h2>
                {JSON.stringify(this.state.state)}
            </h2>
            <h3>
                {this.state.data}
            </h3>
            <h3>
                {this.state.data2}
            </h3>
        </div>)
    }
}
