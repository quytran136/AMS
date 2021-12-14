import React from "react";
import "../Access/Css/Common.scss";
import { connect, useDispatch } from "react-redux";
import {Table } from 'antd';

function VotingHistory(props) {
    const { dataSource } = props
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
    return (
        <div>
            <Table
                scroll={dataSource ? {
                    y: '50vh',
                } : {}}
                dataSource={dataSource}
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
