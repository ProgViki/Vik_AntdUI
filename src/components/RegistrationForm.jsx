import React from 'react'
import {Form, Button, Checkbox, DatePicker, Select, Input } from "antd";
import { values } from 'lodash';



const RegistrationForm = () => {

     
  return (
    <div className="App">
        <header>
            <Form 
                autoComplete="off"
                labelCol={{ span: 10}} 
                wrapperCol={{ span: 24}}
                onFinish={(values) =>{console.log({values})}}
                onFinishFailed={(error) => {console.log({error})}}>
                <Form.Item name="fullName" label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your full name!'
                        },
                        {whitespace: true},
                        {min: 3}
                    ]}
                    hasFeedback>
                    <Input placeholder="Type your name"/>
                </Form.Item>
                <Form.Item name="email" label="Email"
                     rules={[
                        {
                            required: true,
                            message: 'Please enter your full name!'
                        },
                        {type: "email", message: "Please enter a valid email"},
                        {whitespace: true},
                    ]}>
                    <Input placeholder="Type your password"/>
                </Form.Item>
                <Form.Item name="password" label="Password"
                     rules={[
                        {
                            required: true,
                        },
                        {min: 6},
                        {
                            validator: (_, value) =>
                            value && value.includes("A")
                            ? Promise.resolve()
                            : Promise.reject("Password does not match criteria")
                        }
                    ]} hasFeedback>
                    <Input placeholder="Type your password"/>
                </Form.Item>
                <Form.Item name="confirmPassword" label="Confirm Password"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if(!value || getFieldValue("password") === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("The two passwords that you entered do not match!")
                            }
                        })
                    ]} hasFeedback>
                    <Input placeholder="Confirm your password"/>
                </Form.Item>
                <Form.Item name="gender" label="Gender" requiredMark="optional">
                    <Select placeholder="Select your gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="dob" label="Date of Birth" 
                     rules={[
                        {
                            required: true,
                            message: 'Please provide your date of birth'
                        },
                    ]}>
                    <DatePicker picker="date" placeholder="Choose your Date of Birth"/>
                </Form.Item>
                <Form.Item name="website" label="Website"
                     rules={[
                        {
                            required: true,
                            message: 'Please enter your a valid url'
                        },
                        {type: "url", message: "Please enter a valid email"},
                    ]} hasFeedback>
                    <Input placeholder="Add your website url"/>
                </Form.Item>
                <Form.Item name="agreement" wrapperCol={{ span: 24}}
                      valuePropName="checked"
                      rules={[
                        {
                            validator: (_, value) =>
                            value && value.includes("A")
                            ? Promise.resolve()
                            : Promise.reject("To proceed, you need to agree with our terms and conditions")
                        },
                    ]}>
                    <Checkbox>
                        {" "}
                        Agree to our <a href="#">Terms and Conditions</a> 
                    </Checkbox>
                </Form.Item>
                
                <Form.Item wrapperCol={{ span: 24}}>
                    <Button block type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </header>
    </div>
  )
}

export default RegistrationForm
