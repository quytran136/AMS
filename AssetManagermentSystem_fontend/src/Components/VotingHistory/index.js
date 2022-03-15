import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Table } from 'antd';

function VotingHistory(props) {
    const { dataSource } = props

    const [data, setData] = useState();

    const columns = [
        {
            title: 'Ngày thao tác',
            dataIndex: 'CreateDate',
            key: 'CreateDate',
        },
        {
            title: 'Người thực hiện',
            dataIndex: 'Creator',
            key: 'Creator',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'Message',
            key: 'Message',
        },
    ]
    function readData(){
        if(dataSource){
            var list = []
            dataSource.forEach((element, index) => {
                list.push({
                    key: index,
                    CreateDate : element.CreateDate,
                    Creator: element.Creator,
                    Message: element.Message
                })
            });
            setData(list)
        }
    }

    useEffect(readData, [dataSource])

    return (
        <div>
            <Table
                scroll={data ? {
                    y: '50vh',
                } : {}}
                dataSource={data}
                columns={columns}
                pagination={20} />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        amsStore: state.amsReducer,
    };
}

export default connect(mapStateToProps)(VotingHistory);
