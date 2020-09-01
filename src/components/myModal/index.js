import React,{Component} from "react";
import ReactDOM from "react-dom"
import './index.less';
export default class MyModal extends Component{
    constructor(props){
        super(props);
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'layer');
        this.state={
            visible:props.visible,
        }
    }
    componentDidMount(){
        if(this.state.visible){
            document.body.appendChild(this.el);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {


        if(this.props.visible !==this.state.visible){
            if(this.props.visible){
                document.body.appendChild(this.el);
            }else{
                try{
                    if(this.el) document.body.removeChild(this.el);
                }catch (e) {
                }
            }
            this.setState({
                visible:this.props.visible
            })
        }
    }

    componentWillUnmount(){
        try{
            if(this.el) document.body.removeChild(this.el);
        }catch (e) {
        }

    }
    render(){
        let {okText,onOk,onCancel,children,title,content} = this.props;
        return ReactDOM.createPortal((
            <div className="my-modal-wrap" onClick={onCancel}>
                <div className="my-modal">
                    <i className="icon-success"/>
                    <p>{title}</p>
                    <span>{content}</span>
                    <button onClick={()=>{
                        onOk()
                    }}>{okText?okText:"确定"}</button>
                </div>
                {children}
            </div>
        ), this.el);
    }
}

// export function showMyModal (props){
//     this.el = document.createElement('div');
//     this.el.setAttribute('class', 'layer');
//     document.body.appendChild(this.el);
//
//     // componentWillUnmount(){
//     //     try{
//     //         if(this.el) document.body.removeChild(this.el);
//     //     }catch (e) {
//     //     }
//     //
//     // }
//     let {okText,onOk,onCancel,children,title,content} = props;
//     return ReactDOM.createPortal((
//         <div className="my-modal-wrap" onClick={onCancel}>
//             <div className="my-modal">
//                 <i className="icon-success"/>
//                 <p>{title}</p>
//                 <span>{content}</span>
//                 <button onClick={()=>{
//                     onOk()
//                 }}>{okText?okText:"确定"}</button>
//             </div>
//             {children}
//         </div>
//     ), this.el);
// }