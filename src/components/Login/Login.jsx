import axios from 'axios';
import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import {login} from '../../actions/userActions';


const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setshowPassword] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
  
    const { loading, error, userInfo } = userLogin;
    
     
    const dispatch = useDispatch();
    
    const loginUser = (e)=> {
      e.preventDefault();
      if(!email || !password){
        toast.error('Please add your credentials')
       
       
      }
    
      else if(password.length < 6){
        toast.error('Invalid credentials')
      }
      else {
        
        dispatch((login(email, password)))
       
        
          history.push('/mine')
        
       
     
       
      }
        
    }

    const showPasswords = ()=> {
      console.log('click')
      setshowPassword(!showPassword)
    }
    return (
        <>
       
        <div className="container mt-4">
                 <form onSubmit={loginUser}>
  <div class="form-group">
    <label for="exampleInputEmail1" class="label">Email</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} placeholder="Enter email" 
    onChange={(e)=>setEmail(e.target.value)}/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
  <div className="icon__container">
  <i className="fa fa-eye-slash icon" onClick={showPasswords}/>
 
    <input type={`${showPassword ? "text":"password"}`} class="form-control" id="exampleInputPassword1" name="password" value={password} placeholder="Enter Password"
    onChange={(e)=>setPassword(e.target.value)}/>
     </div>
  </div>
  <button type="submit" class={`btn btn-success btn-block ${email.length > 0 || password.length > 0 ?"":"disabled"} `}>Login</button>
  </form>
 </div>
        </>
    )
}

export default Login
