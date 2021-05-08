import React, {useState, useEffect} from 'react'
import './Register.css';

import {useSelector, useDispatch} from 'react-redux';
import { register } from '../../actions/userActions'
import { toast } from 'react-toastify';


const Register = ({history}) => {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referrerCode, setreferrerCode] = useState('');
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister;
  const [showPassword, setshowPassword] = useState(false)
   
  const dispatch = useDispatch();

  const showPasswords = ()=> {
    console.log('click')
    setshowPassword(!showPassword)
  }
       
  const registerUser = (e) => {
    e.preventDefault()
    if(!mobile || !email || !password ||!referrerCode){
     toast.error('Please fill up the details')
   
    }else {
      dispatch(register(mobile,email,password, referrerCode))
      if(userInfo){
        history.push('/mine')
      }
    
    }  
    
   
  }
  
 
    return (
        <>
        <div className="container mt-4">
        <form onSubmit={registerUser}>
  <div class="form-group">
    <label for="exampleInputEmail1" class="label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} placeholder="Enter email" 
    onChange={(e)=>setEmail(e.target.value)}/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" class="label">Mobile</label>
    <input type="text" class="form-control" id="exampleInputPassword1" name="mobile" value={mobile} placeholder="Enter Mobile No.."
    onChange={(e)=>setMobile(e.target.value)}/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" class="label">Password</label>
  <div className="icon__container">
  <i className="fa fa-eye-slash icon" onClick={showPasswords}/>
 
    <input type={`${showPassword ? "text":"password"}`} class="form-control" id="exampleInputPassword1" name="password" value={password} placeholder="Enter Password"
    onChange={(e)=>setPassword(e.target.value)}/>
     </div>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" class="label">Referrer Code</label>
    <input type="text" class="form-control" id="exampleInputPassword1" name="referrerCode" value={referrerCode} placeholder="Enter Referrer Code"
    onChange={(e)=>setreferrerCode(e.target.value)}/>
  </div>
 
  <button type="submit" class="btn btn-success btn-block">Register</button>
</form>
</div>
</>
    )
}

export default Register
