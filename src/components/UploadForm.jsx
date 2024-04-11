import { Button, Form, message, Upload } from 'antd'
import React from 'react'

const UploadForm = () => {
  const [fileList, setFileList] = useState([]);  
  return (
    <>
    <Form onFinish={(values) => {
      console.log({values})
    }}>
    <Form.Item label="Full Name" name={"full_name"}>
      <Input />
    </Form.Item>
    <Form.Item 
        label="Profile Picture" 
        name={"profilePicture"}
        valuePropName="fileList"
        getValueFromEvent={(event) => {
          return event?.fileList
        }}
        rules={[
          {
            required: true,
            message: "Please upload your profile picture"
          },
          {
            validator(_, fileList){
              return new Promise((resolve, reject) => {
                if (fileList && fileList[0].size > 9000000) {
                  reject("File size exceeded");
                message.error("File size exceeded")
                } else {
                  resolve("Success")
                }   
              });
            }
          }
        ]}>
      <Upload
      maxCount={1}
       beforeUpload={(file) => {
        return new Promise((resolve, reject) => {
          if(file.size > 2) {
            reject("File size exceeded");
            message.error("File size exceeded")
          } else {
            resolve ("Success");
          }
      })
    }}
    // action=""
    customRequest={(info) => {
      setFileList([info.file])
    }}
    showUploadList={false}
    >
        <Button>Upload Profile Picture</Button>
        {fileList[0]?.name}
      </Upload>
    </Form.Item>
    <Button type="primary" htmlType="submit" block>
      Submit
      </Button>
      </Form>
    </>
  )
}

export default UploadForm
