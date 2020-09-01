import React, {useState, useEffect} from "react";
import {Spin} from "antd"
import './index.less';

export default function MyLoading(props) {
    let {children,showChild=false} = props;
    const [loading, setLoading] = useState(props.loading);
    useEffect(() => {
        if(props.loading===true&&!loading){
            setLoading(true)
        }else if(props.loading===false&&loading===true){
            let timer;
            timer = setTimeout(()=>{
                setLoading(false)
            },150)
            return()=>{
                timer&&clearTimeout(timer)
            }
        }
    });

    if(loading){
        if(showChild){
            return <Spin spinning={loading} tip={"加载中..."} >{children}</Spin>
        }else{
            return <div className="my-loading-wrap">
                <Spin spinning={loading} tip={"加载中..."} />
            </div>
        }
    }else{
        return children

    }
}
