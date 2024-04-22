import { PlusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd'
import React from 'react'

const DynamicForm = () => {
    const onFinish = (values) => {
        console.log({values});
    };

    const initialValues = {
        teacher: "Viki",
        students: [
            {first: "Vikas", last: "Kumar", gender: "male"}
    ]}
  return (
    <div>
      <Form
      initialValues={initialValues}  // This is the initial value of the form
      onFinish={onFinish}
      style={{width: 500}}>
        <Form.Item  rules={[
              { required: true, message: 'Teacher name is required' },
        ]} 
                name={"teacher"} label={"Teacher Name"}>
            <Input placeholder="Teacher Name" />
        </Form.Item>
        <Form.Item name={"class"} label={"Class Name"}>
            <Input placeholder="Class Name" />
        </Form.Item>
        <Form.List>
            {(fields, { add, remove }) =>(
                <>
                {fields.map(({field, index}) => {
                    return(
                        <Space>
                        <Form.Item  key={field.key}
                                    name={[field.name, "first"]} label={`${index + 1} - Student`}>
                            <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item  key={field.key}
                                    name={[field.name, "last"]} >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                        <Form.Item
                                name={[field.name, "gender"]} >
                                    <Select placeholder="Gender">
                                        <Select.Option value="male">Male</Select.Option>
                                        <Select.Option value="female">Female</Select.Option>
                                    </Select>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} style={{height: 40, color: "red"}}/>
                        </Space>
                    );
                   
                    })}
                    <Form.Item name={[field.name, "first"]} label={`${index + 1} - Student`}>
                            <Button icon={<PlusOutlined />} type="dash">
                                Add a Student
                            </Button>
                        </Form.Item>
                </>
            )} 

        </Form.List>
      </Form>
    </div>
  )
}

export default DynamicForm
