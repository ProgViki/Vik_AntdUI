import { Button, Typography, Upload } from 'antd'
import React, { useState } from 'react'
import { axios } from 'axios';
import { FileOutlined } from '@ant-design/icons';

function FileUpload() {
    const [files, setFiles] = useState({});
    const handleFileUpload = ({ file }) = {
    setFiles((pre) => {
        return {...pre, [file.uid]: file}
    });

    const getFileObject = (progress) => {
        return {
            name: file.name,
            uid: file.uid,
            progress: progress
        }
    }
        axios.post("http://localhost:8000/fileUpload", file, {
            onUploadProgress: (event) => {
                console.log(event);
            },
        });
    };


  return (
    <Space direction="vertical">
        <Upload multiple showUploadList={false}
    customRequest={handleFileUpload}>
      <Button>Click to Upload</Button>
    </Upload>

    {Object.values(files).map((file, index) =>{
        <Space style={{ backgroundColor: "rgba(0,0,0,0.5)",
            width: 500, padding: 8,
        }}>
            <Space>
                <FileOutlined />
                <Typography>{file.name}</Typography>
                <Progress percent={file.progress * 100} />
            </Space>
           
        </Space>
    })}
    </Space>
    
  )
}

export default FileUpload
