import React, {Component} from "react";
import {Empty, Pagination as AntdPagination} from 'antd';
import './index.less';

export default class Pagination extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        if(!this.props.total){
            return(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
        }
        return <AntdPagination
            itemRender={(current, type, originalElement) => {
                if (type === 'prev') {
                    return <a className="operation">上一页</a>;
                }
                if (type === 'next') {
                    return <a className="operation">下一页</a>;
                }
                return originalElement;
            }}
            pageSize={20}
            {...this.props}
            current={this.props.current?Number(this.props.current):1}
        />
    }
}