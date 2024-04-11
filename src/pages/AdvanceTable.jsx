import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, message, Popconfirm, Space, Table } from 'antd';
import { isEmpty  } from 'lodash';


const AdvanceTable = () => {
    const [gridData , setGridData ] = useState([]);
    const [loading , setLoading] = useState(false);
    const [editRowKey, setEditRowKey] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        loadData()
    }, []);


    const loadData = async () => {
        setLoading(true);
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
            setGridData(response.data);
            setLoading(false);
    };
        const dataWithAge = gridData.map((item) => ({
            ...item,
            age: Math.floor(Math.random() * 6) + 20,
    }));
    const modifiedData = dataWithAge.map(({body, ...item}) => ({
        ...item,
        key: item.id,
        message: isEmpty(body) ? item.message : body,
        
    }))

    const handleDelete = (value) => {
        const dataSource = [...modifiedData];
        const filteredData = dataSource.filter((item) => item.id !== value.id);
        setGridData(filteredData);
    }

    const isEditing = (record) => {
        return record.key === editRowKey;
    }
    const cancel = () => {}
    const save = () => {}
    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            email: "",
            message: "",
            ...record
        })
        setEditRowKey(record.key);
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            align: "center",
            editable: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            align: "center",
            editable: true,
        },
        {
            title: "Age",
            dataIndex: "age",
            align: "center",
            editable: false,
        },
        {
            title: "Message",
            dataIndex: "message",
            align: "center",
            editable: false,
        },
        {
            title: "Action",
            dataIndex: "action",
            align: "center",
            render: (_, record) => {
                const editable = isEditing(record);
                return  modifiedData.length >= 1 ? (
                <Space>
                    <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleDelete(record)}>
                        <Button type="primary" danger disabled={editable} >Delete</Button>
                    </Popconfirm>
                    <Popconfirm>
                        {editable ? (
                            <span>
                                <Space size="middle">
                                    <Button type="primary" style={{marginRight: 8}}
                                     onClick={(e)=> save(record.key)}>Save</Button>
                                    <Popconfirm title="Are sure to cancel?" onConfirm={cancel}>
                                    <Button>Cancel</Button>
                                    </Popconfirm>

                                </Space>
                            </span>
                        ):(
                            <Button onClick={() => edit(record)} type="primary">Edit</Button>
                        )}
                    </Popconfirm>
                </Space>
                
        ): null;
        }
    },
    ]
 const mergedColumns = columns.map((col) => {
     if (!col.editable) {
         return col;
     }
     return {
         ...col,
         onCell: (record) => ({
             record,
             dataIndex: col.dataIndex,
             title: col.title,
             editing: isEditing(record),
         }),

    }
})
    const EditableCell = ({editing,  dataIndex, title, record, children, ...restProps}) =>{
        const input = <Input /> 
        return(
            <td {...restProps}>
                {editing ? (
                    <Form.Item name={dataIndex} style={{margin: 0}} rules={[{required: true, message: `Please Input ${title}!`}]}>
                        {input}
                    </Form.Item>):
                    (children)}
            </td>
        )
    }


  return (
    <div>
         <Form form={form} component={false}>
         <Table 
        columns={mergedColumns}
        components={{body:  EditableCell}}
        dataSource={modifiedData}
        bordered
        loading={loading}
        /> 
         </Form>
    </div>
  )
}

export default AdvanceTable
