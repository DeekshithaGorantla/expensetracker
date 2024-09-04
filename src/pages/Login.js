import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner';
const Login = () => {
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const submitHandler=async (values)=>{
        try{
            setLoading(true)
          const {data}= await axios.post('/users/login',values)
          setLoading(false)
          message.success('login success')
          localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
          navigate('/')
        }catch(error){
            setLoading(false)
           message.error('Something went wrong')

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
    <div className='register-page'>
        {loading && <Spinner/>}
         <Form layout='vertical'
         style={{
      maxWidth: 2000
    }} onFinish={submitHandler}>
            <h5>Login Form</h5>
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
                <Link to="/register">Not a user? Click here to register</Link>
                <button className='btn btn-primary padding-20px'>Login</button>
            </div> 
         </Form>
         
    </div>
    </>
  )
}

export default Login
