import { Input, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const OperationalTable = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [dataSource, setDataSource ] = useState([
        {
            id: '1',
            name: 'John',
            email: 'John@gmail.com',
            address: 'New York No. 1 Lake Park',
        },
        {
            id: '2',
            name: 'Viki',
            email: 'John@gmail.com',
            address: 'London No. 1 Lake Park',
        },
        {
            id: '3',
            name: 'Dan',
            email: 'John@gmail.com',
            address: 'Sidney No. 1 Lake Park',
        },
        {
            id: '4',
            name: 'Sam',
            email: 'John@gmail.com',
            address: 'London No. 2 Lake Park',
        },
        {
            id: '5',
            name: 'Ken',
            email: 'John@gmail.com',
            address: 'London No. 3 Lake Park',
        },
    ]); 
    const columns = [
        {
            key: '1',
            title: 'ID',
            dataIndex: 'id'
        },
        {
            key: '2',
            title: 'Name',
            dataIndex: 'name'
        },
        {
            key: '3',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: '4',
            title: 'Address',
            dataIndex: 'address'
        },
        {
            key: '5',
            title: 'Actions',
            render: (record) => {
                return (
                <>
                    <EditOutlined 
                        onClick={() => {onEditStudent(record)}} />
                    <DeleteOutlined
                        onClick={() => {onDeleteStudent(record)}}
                         style={{ color: "red", marginLeft: 12}}/>
                </>
            )}
        }
    ]

    const onAddStudent = () =>{
        const randomNumber = parseInt(Math.random()*1000)
        const newStudent = {
            id: randomNumber,
            name: "Name " + randomNumber,
            email: randomNumber + "sam@gmail.com",
            address: "Address " + randomNumber
        }
        setDataSource(pre => {
            return [
               ...pre, newStudent            ]
        })
    }
    const onDeleteStudent = (record) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'Do you want to delete this student record?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setDataSource(pre => {
                    return pre.filter((student) => student.id!== record.id)
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        })  
    }
    const onEditStudent = (record) => {
        setIsEditing(true);
        setEditingStudent({...record})
    }
    const resetEditing = () =>{
        setIsEditing(false);
        setEditingStudent(null);
    }
  return (
    <div>
      <header>
        <Button onClick={onAddStudent}
        >Add a new Student</Button>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
        title="Edit Student"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
            resetEditing();
        }}
        onOk={() => {
            setDataSource((pre) =>{
                return pre.map(student => {
                    if(student.id === editingStudent.id) {
                        return editingStudent
            } else {
                        return student
            }
        })
                })
                resetEditing()
            }
        }

        >
            <Input value={editingStudent?.name}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return {...pre, name: e.target.value};
                        });
                    }}/>
            <Input value={editingStudent?.email}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return {...pre, email: e.target.value};
                        });
                    }}/>
            <Input value={editingStudent?.address}
                    onChange={(e) => {
                        setEditingStudent((pre) => {
                            return {...pre, address: e.target.value};
                        });
                    }}/>

        </Modal>
      </header>
    </div>
  )
}

export default OperationalTable
