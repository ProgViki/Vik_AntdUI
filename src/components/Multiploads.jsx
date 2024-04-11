import { Upload, Button, Typography, Space} from 'antd'
import React, { useState } from 'react';
import axios from "axios";




const MultiUploads = () => {

    const [files, setFiles] = useState({});
    const handleFileUpload = ({ file }) => {
        const getFileObject = (progress, estimated) => {
            return {
                name: files.name,
                uid: files.uid,
                progress: progress,
                estimated: estimated,
            };
        };
        axios.post("http://localhost:8000/fileUpload", file, {
            onUploadProgress: (event) => {
                console.log(event);
                setFiles((pre) => {
                    return {
                       ...pre,
                        [files.uid]: getFileObject(event.loaded, event.total),
                    };
                })
    }})
    }


  return (
    <Space direction="vertical" style={{ width: "100vw"}}>
             <Upload multiple customRequest={handleFileUpload}>
        <Button>Click to Upload</Button>
    </Upload>
    {Object.values(files).map((file, index) =>{
        return ( 
        <Space>
            <FileOutlined />
            <Typography>
                {file.name}
            </Typography>
        </Space>);
    })}
    </Space>
   
  )
}

export default MultiUploads