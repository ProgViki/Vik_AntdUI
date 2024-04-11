import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Form, Input, message, Popconfirm, Space, Table } from 'antd';
import { filter, isEmpty  } from 'lodash';
import Highlighter from "react-highlight-words";
 

const AdvanceTables = () => {
    const [gridData , setGridData ] = useState([]);
    const [loading , setLoading] = useState(false);
    const [editRowKey, setEditRowKey] = useState("");
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState();
    const [searchColText, setSearchColText] = useState();
    const [searchCol, setSearchCol] = useState();
    let [filteredData] = useState();
    const type = "DraggableBodyRow";
    const tableRef = useRef();

    useEffect(() => {
        loadData()
    }, []);


    const loadData = async () => {
        setLoading(true);
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
            setGridData(response.data);
            setLoading(false);
    };

    const DraggableBodyRow = ({
        index, moveRow, className, style, ...restProps
    }) => {
        const ref = useRef();
        const [{isOver, dropClassName}, drop] = useDrop({
            accept: type,
            collect: (monitor) => {
                const{index: dragIndex} = monitor.getItem() || {};
                if (dragIndex === index) {
                    return {};
            }
            return{
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? "drop-down-downward" : "drop-down-upward"
            }
        },
        drop: (item) =>{
            moveRow(item.index, index);
        }
    });
    const [, drag] = useDrag({
        type,
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });
    drop(drag(ref));
    return (
        <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{cursor: "move", ...style}}
        {...restProps}
        />

        
    )
    }
    const moveRow = useCallback((dragIndex, hoverIndex) =>{
        const dragRow = modifiedData[dragIndex];
        setGridData[update(modifiedData, {
            $splice: [[dragIndex, 1],
        [hoverIndex, 0, dragRow],
        ]

        }
        )]
    })
    

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
    const save = async (key) => {
        try{
            const row = await form.validateFields();
            const newData = [...modifiedData];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                setGridData(newData);
                setEditRowKey
            }
        } catch{

        }

    }
    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            email: "",
            message: "",
            ...record
        })
        setEditRowKey(record.key);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropDown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) => (
            <div style={{padding: 8}}>
                <Input 
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
                style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space style={{marginTop: 2}}>
                    <Button icon={<SearchOutlined />} size="small"
                    style={{width: 90}}
                     type="primary" onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}>
                        Search
                    </Button>
                    <Button icon={<SearchOutlined />} size="small"
                    style={{width: 90}}
                     type="primary" onClick={() => handleResetCol(clearFilters)}>
                        Reset
                    </Button> 
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{color: filtered ? "#1890ff" : undefined}} />
        ),
        onFilter: (value, record) =>
        record[dataIndex] 
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()):"",
        render: (text) =>
        searchedCol === dataIndex ? (
            <Highlighter
            highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
            />
        ):(text)
    }) 
     
    const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedCol(dataIndex);
    }
    const handleResetCol = (clearFilters) => {
        clearFilters();
        setSearchText(""); 
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
            sorter: (a, b) => a.name.length = b.name.length,
            sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
            ...getColumnSearchProps("name")
        },
        {
            title: "Email",
            dataIndex: "email",
            align: "center",
            editable: true,
            sorter: (a, b) => a.email.length = b.email.length,
            sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
        },
        {
            title: "Age",
            dataIndex: "age",
            align: "center",
            editable: false,
            sorter: (a, b) => a.age.length = b.age.length,
            sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
        },
        {
            title: "Message",
            dataIndex: "message",
            align: "center",
            editable: false,
            sorter: (a, b) => a.message.length = b.message.length,
            sortOrder: sortedInfo.columnKey === "message" && sortedInfo.order,
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

const reset = () =>{
    setSortedInfo({});
    loadData();
}
const handleChange = () =>{
    setSearchText(e.target.value);
    if (e.target.value === ""){
        loadData();
    }
}
const globalChange = () =>{
    filteredData = modifiedData.filter((value) => {
        return(
            value.name.toLowerCase().includes(searchText.toLowerCase()) ||
            value.email.toLowerCase().includes(searchText.toLowerCase()) ||
            value.message.toLowerCase().includes(searchText.toLowerCase())
        );
    })
    setGridData(filteredData);
    };

  return (
    <div>
        <Space style={{marginBottom: 16}}>
            <Input placeholder="Enter Search Text"
            onChange={handleChange}
            type="text"
            allowClear
            value={searchText}/>
            <Button onClick={reset}>Reset</Button>
        </Space>
         <Form form={form} component={false}>
         <DndProvider backend={HTML5Backend}>
         <Table 
        columns={mergedColumns}
        components={{
            body: {
                cell: EditableCell,
            },
        }}
        dataSource={filteredData && filteredData.length ? filteredData : modifiedData}
        expandable={{
            expandedRowRender: (record) => (
                <p style={{margin: 0}}>{record.info}</p>
            ),
            rowExpandable: (record) => record.info !== "Not Expandable",
        }}
        bordered
        loading={loading}
        /> 
         </DndProvider>
         </Form>
    </div>
  )
}

export default AdvanceTables
