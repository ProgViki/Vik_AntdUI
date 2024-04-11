import { Table } from 'antd'
import React, { useState } from 'react'

const DynamicTable = () => {

    const [columns, setColumns] = useState([])
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        fetch(`https://dummyjson.com/${dataType}`)
        .then((res) => res.json())
        .then((result) => {
            const list = result[dataType] || []
            const firstObjects = list[0] || {}
            const cols = []
            for (const key in firstObjects) {
                const col = {
                    title: key,
                    dataIndex: key,
                    render: (value) => {
                      return <span>{String(value)}</span>
                    },
                }
                cols.push(col)
            }
            setColumns(cols);
            setDataSource(result.quotes);
        })
    }, []);
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} scroll={{ y: 500}}/>   
    </div>
  )
}

export default DynamicTable
