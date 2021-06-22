import React, {useState, useEffect} from 'react';
import './Modal.css';
import {useSelector, useDispatch}  from 'react-redux';

import {getUserDetails} from '../../actions/userActions'
import {useHistory, useLocation} from 'react-router-dom';

import { toast } from 'react-toastify';
import axios from "axios";


const Modal = () => {

    const openModals = useSelector((state) => state.openModals)
    const { openModal} = openModals;
    
  
    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin

    const userDetail = useSelector((state) => state.userDetail)
    const { loading, error, userDetails } = userDetail;
   

    const [nickName, setNickName] = useState('');
  

    const dispatch = useDispatch();
    const history = useHistory();
    const location= useLocation()

    useEffect(()=> {
         if(!userDetails){
            dispatch(getUserDetails())
        }else {
            setNickName(userDetails.user.nickName)
        }
    },[history, userDetails, dispatch])

    const handleSubmit = (e)=> {
      
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
        `/api/v1/auth/${userDetails.user._id}/changenickname`,
        body,
        config
      ).then(()=>{
          dispatch({
              type:"CHANGE_NICKNAME_SUCCESS",
          
          })
          dispatch({
            type:"MODAL_CLOSE",
          })
         
       
          dispatch({
            type:"USER_DETAILS_SUCCESS"
          })
       
      })
      
      toast.success('Nickname Changed')
      
    }

    const closeModals = () => {
      dispatch({
        type:"MODAL_CLOSE"
      })
    }

    return (
        <div
        className={`${
          openModal ? 'modal__overlay show_modal' : 'modal__overlay'
        }`}
      >
            <div className="modal__container">
            <form onSubmit={handleSubmit} className="modal__form">
                <input type="text" value={nickName} onChange={(e)=>setNickName(e.target.value)} className="modal__input"/>
                <button type="submit" className="modal__change__btn change">Change</button>
                <button type="button" className="modal__change__btn stop" onClick={closeModals}>Close</button>
            </form>
           
            </div>
         
        </div>
    )
}

export default Modal
