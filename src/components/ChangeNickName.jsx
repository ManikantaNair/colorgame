import React, {useEffect, useState} from 'react';


import {useSelector, useDispatch} from 'react-redux';
import { getUserDetails } from '../actions/userActions';

const ChangeNickName = ({history}) => {

    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin

    const userDetail = useSelector((state) => state.userDetail)
    const { loading, error, user } = userDetail;

    const [nickName, setNickName] = useState('');
    const dispatch = useDispatch();
     useEffect(()=> {
         if(!userInfo){
             history.pushState('/');
         }
         if(!user){
             dispatch(getUserDetails())
         }else {
             setNickName(user.data.user.nickName)
         }
     },[history, user, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
         <form onSubmit={handleSubmit}>
             <input type="text" value={nickName} onChange={(e)=> setNickName(e.target.value)}/>
             <button type="submit" >Change</button>
         </form>
        </div>
    )
}

export default ChangeNickName
