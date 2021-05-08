import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUserDetails} from '../../actions/userActions'
import {Link} from 'react-router-dom'
import './Mine.css';
import Modal from '../Modal/Modal';

const Mine = ({history}) => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin

    const userDetail = useSelector((state) => state.userDetail)
    const {  userDetails} = userDetail;

   
  console.log(userDetails)

     
    useEffect(()=> {
        if(userInfo){
            dispatch(getUserDetails())
        }
 
      
    }, [dispatch])
     


    return (
        <div className="main__bg">
        <div className="me">
           {userDetails && (
            <>
            <h4 className="me_list">Your Game Id :{userDetails.user.userGameId}</h4>
            <h5 className="me_list">NickName:{userDetails.user.nickName}</h5>
            <h5 className="me_list">Mobile: {userDetails.user.mobile}</h5>
      
            <h5 className="me_list">Your Referral Code: {userDetails.user.referralCode}</h5>
            <h5 className="me_list">You have been referred By: {userDetails.user.referrerId ? <><strong>{userDetails.user.referrerId.email}</strong>with a code of {userDetails.user.referrerCode}</>:<h5>No Referrer</h5> }</h5>
            {userDetails.refUser.length > 0 ? <h5 className="me_list">You referred:{userDetails.refUser.map((rf)=>(
                 
                <h5 className="me_list">{rf.email}</h5>
            ))}</h5>:<h5 className="me_list">Please Refer someone to win exciting Prices</h5>}
            </>
           )}
               
        
            <Link to="/play" className="play__btn">Play Now</Link>
        </div>
      <Modal />

        </div>


    )
}

export default Mine
