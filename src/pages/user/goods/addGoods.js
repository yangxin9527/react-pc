
import React, {Component} from "react";
import {
    Form,
    Input,
    Button,
    Select
} from 'antd';
import "./addGoods.less"
import MyUpload from "../../../components/upload";
import {inject, observer} from "mobx-react";

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 8,
    },
};

const arr = [
    {
        name: 'title',
        label: "商品名称",
        type: 'input',
        required: true,
    },
    {
        name: 'dispatching',
        label: "支持运输(不可多选)",
        type: 'select',
        placeholder:"请选择支持运输方式",
        arr:[
            {
                label:"船运",
                value:"2"
            },
            {
                label:"汽运",
                value:"3"
            },
        ],
        required: true,
    },
    {
        name: 'dispatching2',
        label: "支持运输",
        type: 'select',
        multiple:true,
        placeholder:"请选择支持运输方式",
        arr:[
            {
                label:"船运",
                value:"2"
            },
            {
                label:"汽运",
                value:"3"
            },
            {
                label:"铁运",
                value:"4",
                disabled:true
            },
        ],
        required: true,
    },

    {
        name: 'purpose',
        label: "适合用途",
        type: 'textarea',
        required: true,
        placeholder:"比如修路、铺路"
    },

    {
        name: 'pic',
        label: "商品图片(可多选)",
        type: 'upload',
        required: true,
        multiple:8,
    },
    {
        name: 'mv',
        label: "商品视频",
        type: 'upload',
        required: true,
    },










];

@inject("rootStore")
@observer
class AddGoods extends Component {
    constructor(props) {
        super(props);
        let defaultValue = this.props.history.location.state;
        this.state={
            defaultValue:defaultValue
        }
    }
    formRef = React.createRef();

    componentDidMount() {

    }

    async onFinish(values) {
        // console.log('Received values of form: ', values);
        for (let i in values) {
            if (!values[i]) {
                values[i] = ""
            }
        }

        values.dispatching=values.dispatching.join(",")

        // 发送请求
        // let res = await service.editGoods({
        //     ...values,
        // })


    }

    render() {
        let {defaultValue} = this.state;

        return <div className="certification-wrap add-goods-wrap">
            <div className="form-wrap">
                <p className="add-goods-title">发布商品</p>
                <Form
                    name="validate_other"
                    ref={this.formRef}
                    {...formItemLayout}
                    onFinish={this.onFinish.bind(this)}
                    size={"large"}
                    initialValues={defaultValue}
                >
                    {arr.map((item, index) => {
                        switch (item.type) {
                            case "upload":
                                let fileList= []
                                if(defaultValue&&defaultValue[item.name]){
                                    let arr = defaultValue[item.name].split(",");
                                    arr.map((picItem,i)=>{
                                        fileList.push({
                                            uid: item.name+"_"+i,
                                            name: item.name+"_"+i,
                                            status: 'done',
                                            url: picItem,
                                        })
                                    })
                                }


                                return (<Form.Item
                                    key={index}
                                    name={item.name}
                                    label={item.label}
                                    rules={[
                                        {
                                            required: item.required,
                                            message: `请上传${item.label}!`,
                                        },
                                    ]}
                                >
                                    <MyUpload
                                        fileList={fileList}
                                        multiple={item.multiple}
                                        callback={(image,type) => {
                                            let obj = {}
                                            let arr = this.formRef.current.getFieldValue(item.name);
                                            if(!arr){
                                                arr=[]
                                            }else{
                                                arr = arr.split(",")
                                            }
                                            if(arr.indexOf(image)===-1){
                                                if(type==="add"){
                                                    arr.push(image)
                                                }
                                            }else{
                                                if(type==="remove"){
                                                    arr.splice(arr.indexOf(image),1)
                                                }
                                            }
                                            obj[item.name]= arr.join(",");
                                            this.formRef.current.setFieldsValue(obj);
                                        }}
                                    />
                                </Form.Item>)
                                break;
                            case "select":

                                return (<Form.Item
                                    key={index}
                                    name={item.name}
                                    label={item.label}
                                    rules={[
                                        {
                                            required: item.required,
                                            message: `请选择${item.label}!`,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder={item.placeholder?item.placeholder:`请选择${item.label}`}
                                        mode={item.multiple?"multiple":""}
                                    >
                                        {item.arr.map((item2,i)=>(<Option key={i} disabled={item2.disabled} value={item2.value}>{item2.label}</Option>))}
                                    </Select>
                                </Form.Item>);
                            case "textarea":
                                return (<Form.Item
                                    key={index}
                                    name={item.name}

                                    label={item.label}
                                    rules={[
                                        {
                                            required: item.required,
                                            message: `请填写${item.label}!`,
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        placeholder={item.placeholder?item.placeholder:`请输入${item.label}`}
                                                     rows={2}/>
                                </Form.Item>)


                            default:
                                return (<Form.Item
                                    key={index}
                                    name={item.name}
                                    label={item.label}
                                    rules={[
                                        {
                                            required: item.required,
                                            message: `请填写${item.label}!`,
                                        },
                                    ]}
                                >
                                    <Input disabled={item.name==="price"&&defaultValue}
                                           placeholder={item.placeholder?item.placeholder:`请输入${item.label}`}
                                    />
                                </Form.Item>)

                        }
                    })}


                    <Form.Item
                        wrapperCol={{
                            span: 14,
                            offset: 9,
                        }}
                    >
                        <Button className="form-submit-btn" type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>

    }
}

export default AddGoods
