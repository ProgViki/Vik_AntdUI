import React, { useEffect, useState } from 'react'
import "antd/dist/antd.css"
import { Table } from 'antd'


//  HOW TO ADD PAGINATION, SORTING, & FILTERS TO ANTD TABLES
const ModifiedTable = () => {

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState();

        useEffect(() => {
            setLoading(true);
            fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response=>response.json())
            .then(data=>{
                setDataSource(data)
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                setLoading(false)
            })
        }, []);

const columns = [
    {
        key: "1",
        title: "ID",
        dataIndex: "id"
    },
    {
        key: "2",
        title: "User ID",
        dataIndex: "user",
        sorter: (record, record2)=>{
            return record.user.Id > record2.user.Id
        }
    },
    {
        key: "3",
        title: "Status",
        dataIndex: "completed",
        render: (completed) =>{
            return<p>{completed? "Completed" : "In Progress"}</p>
        },
        filters:[
           {text: 'Complete', value: true},
           {text: 'In Progress', value: false}
        ],
        onFilter: (value, record) => record.completed === value

    }
]

  return (
    <div>
      <header>
        <Table 
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
            onChange:(page, pageSize) =>{
                setPage(page);
                setPageSize(pageSize);
            }
        }}
        />
      </header>
    </div>
  )
}

export default ModifiedTable
