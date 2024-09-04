import React,{useState,useEffect } from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner';

const Register = () => {
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
    const submitHandler=async (values)=>{
      console.log(values);
      try{
        setLoading(true)
          await axios.post('/users/register',values);
            message.success('Registration successful')
            setLoading(false)
            navigate("/login")
      }catch(error){
        setLoading(false)
         message.error('error')

      }
    };

     //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
     <div className="register-page">
      {loading && <Spinner/>}
         <Form layout='vertical'
         style={{
      maxWidth: 2000
    }} onFinish={submitHandler}>
            <h5>Register Form</h5>
            <Form.Item label="Name" name="name">                                               
                <Input/>
            </Form.Item>
            <Form.Item label="Email" name="email" >
                <Input/>
            </Form.Item>
            <Form.Item label="Password" name="password"
            rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}>
                <Input.Password/>
            </Form.Item >
            <div className='d-flex'>
                <Link to="/login">Already Registered? Click here to login</Link>
                <button className='btn btn-primary padding-20px'>Register</button>
            </div> 
         </Form>
         
        </div> 
    </>
  );
};

export default Register;
