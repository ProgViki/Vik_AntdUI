import React from 'react'
import "antd/dist/antd.css"
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const InputForm = () => {
  return (
    <div>
        <header>
            <Input.Search
            placeholder="Name"
            maxLength={10}
            prefix={<UserOutlined/>}
            allowClear
            >
            </Input.Search>
        </header>
      
    </div>
  )
}

export default InputForm
