import React,{Component} from "react";

import './index.less';
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }


export default class MyUpload extends Component{
    constructor(props) {
        super(props);
        this.state={
            fileList:props.fileList?props.fileList:[]
        }
    }

    render(){
        let {callback,multiple=1} = this.props;
        return <Upload
            name="image"
            onRemove={(file)=>{
                callback&&callback(file.url,"remove");
            }}
            fileList={this.state.fileList}
            multiple={!!multiple}
            listType="picture"
            onChange={({file,fileList} )=>{
                // 1. Limit the number of uploaded files
                // Only to show two recent uploaded files, and old ones will be replaced by the new
                fileList = fileList.slice(0 - multiple);
                // 2. Read from response and show file link
                fileList = fileList.map(file => {
                    if (file.response) {
                        // Component will show file.url as link
                        file.url = file.response.data.image_long;
                        if(file.response.code===200){
                            callback&&callback(file.response.data.image,"add");
                        }
                    }
                    return file;
                });
                this.setState({ fileList });
            }}

            action={"/api/about/upload"}
            // action={(file)=>{
            // base64也可以
            //     return new Promise((resolve)=>{
            //         getBase64(file, imageUrl => {
            //             service.upload({
            //                 imageBase:imageUrl
            //             }).then((res)=>{
            //                 if(res.code===200){
            //                     callback&&callback(res.data.image);
            //                 }
            //                 resolve(imageUrl)
            //             })
            //         });
            //     })
            // }}

        >
            <Button className="form-upload-img">
                <UploadOutlined /> 选择图片
            </Button>
        </Upload>
    }
}
