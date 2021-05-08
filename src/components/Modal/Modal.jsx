import React, {useState, useEffect} from 'react';
import './Modal.css';
import {useSelector, useDispatch}  from 'react-redux';

import {getUserDetails} from '../../actions/userActions'
import {useHistory, useLocation} from 'react-router-dom';
import {changeNickName} from '../../actions/userActions';
import axios from "axios";


const Modal = () => {

    const openModals = useSelector((state) => state.openModals)
    const { openModal} = openModals;
    
  
    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin

    const userDetail = useSelector((state) => state.userDetail)
    const { loading, error, user } = userDetail;

    const [nickName, setNickName] = useState('');
  

    const dispatch = useDispatch();
    const history = useHistory();
    const location= useLocation()
    useEffect(()=> {
        
        if(!user){
            dispatch(getUserDetails())
        }else {
            setNickName(user.nickName)
        }
    },[history, user, dispatch])

    const handleSubmit = (e)=> {
        console.log(user.data.user._id)
        e.preventDefault()
        // correct code
    //    dispatch(changeNickName(user.data.user._id, nickName))
    //    dispatch({
    //        type:"MODAL_CLOSE",

    //    })
       
      
    // }

    //try code
    const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const body = {
        nickName,
      };
  
       axios.put(
        `/api/v1/auth/${user.data.user._id}/changenickname`,
        body,
        config
      ).then(({data})=>{
          dispatch({
              type:"CHANGE_NICKNAME_SUCCESS",
              payload:data
          })
          dispatch({
            type:"MODAL_CLOSE",
          })
         
       
          dispatch({
            type:"USER_DETAILS_SUCCESS"
          })
       
      })

      
    }

    return (
        <div
        className={`${
          openModal ? 'modal__overlay show_modal' : 'modal__overlay'
        }`}
      >
            <div className="modal__container">
            <form onSubmit={handleSubmit}>
                <input type="text" value={nickName} onChange={(e)=>setNickName(e.target.value)}/>
                <button type="submit">Change</button>
            </form>
           
            </div>
         
        </div>
    )
}

export default Modal
