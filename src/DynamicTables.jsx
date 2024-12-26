import { Table, Tag } from 'antd';
import React, { useState, useEffect } from 'react';

const DynamicTables = () => {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
//   const [dataType, setDataType] = useState('posts');
  const [dataType, setDataType] = useState('comments');


  useEffect(() => {
    fetch(`https://dummyjson.com/${dataType}`)
      .then((res) => res.json())
      .then((result) => {
        const list = result[dataType] || [];
        const firstObject = list[0] || {};
        const cols = [];

        for (const key in firstObject) {
          let render = (value) => {
            return <span>{String(value)}</span>;
          };

          if (typeof firstObject[key] === 'object') {
            if (Array.isArray(firstObject[key])) {
              render = (value) => {
                return (
                  <span>
                    {value.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </span>
                );
              };
            } else {
              render = (value) => {
                return (
                  <span>
                    {Object.keys(value).map((key) => (
                      <div key={key}>{key}: {value[key]}</div>
                    ))}
                  </span>
                );
              };
            }
          }

          const col = {
            title: String(key).charAt(0).toUpperCase() + String(key).slice(1),
            dataIndex: key,
            render,
          };

          cols.push(col);
        }

        setColumns(cols);
        setDataSource(list);
      });
  }, [dataType]);

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} scroll={{ y: 500 }} />
    </div>
  );
};

export default DynamicTables;