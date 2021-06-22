import React, {useState, useEffect} from 'react'
import './Recharge.css';
import rechargeBtns from '../../data'
import Buttons from '../Buttons';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {getBalance} from '../../actions/Recharge'
import { toast } from 'react-toastify';
import ButtonLoader from '../ButtonLoader';

const Reacharge = () => {
    const [amounts, setAmounts] = useState('');

    const dispatch = useDispatch();

    const rechargeUser = useSelector((state) => state.rechargeUser)
    const { loading, balance} = rechargeUser;

    useEffect(()=> {
      dispatch(getBalance())
    },[dispatch])

    const fillForm = (e) => {
    e.preventDefault();

      const something = e.target.innerHTML;
       const sm =something.split(' ')[1];
       setAmounts(sm);
   
    }
    
    const loadScript = (src) => {
        return new Promise((resolve, reject)=>{
            const script = document.createElement('script')
            script.src= src;
            script.onload = ()=> {
                resolve(true)
            }
            script.onerror = ()=> {
                resolve(false);
            }
            document.body.appendChild(script)
        })
    }
    const displayRazorpay = async(e) => {
        e.preventDefault()
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const body ={
            amount:amounts
        }
        const token = localStorage.getItem('userInfo');
           const tokenn =JSON.parse(token);

           console.log(tokenn.token)
        
        const config ={
            headers:{
                'Content-Type':"application/json",
                'Authorization':`Bearer ${tokenn.token}`
            }
        }
        const result = await axios.post('/api/v1/payments/orders', body, config)
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        const { amount, id: order_id, currency } = result.data.data;
        const options = {
            key: "rzp_test_uMdSD2Q1oqNLu0", 
            amount: amount.toString(),
            currency: currency,
            name: "Color game",
            description: "Test Transaction",
          
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                const token = localStorage.getItem('userInfo');
                const tokenn =JSON.parse(token);
     
               

                  const config={
                      headers:{
                          'Content-Type':"application/json",
                          'Authorization':`Bearer ${tokenn.token}`
                      }
                  }
               

                const result = await axios.post("/api/v1/payments/success", data, config);

                dispatch(getBalance())
                toast.success("Recharged Succesfully")
            },
           
        };
         
     
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
     
        setAmounts('');
        
    }

    // const chumma = () => {
    //    if(loading){
          
    //      if(rechargeUser === {} && rechargeUser.balance.sucess ==="fail"){
    //          return <span>0.00</span>
    //      }else {
           
    //         if(rechargeUser === {}){
    //             return  <span>{rechargeUser.balance.data.totalBalance}</span>
    //         }
    //         else {
    //             return <span>0.00</span>
    //         }
         
  
    //    }
    // }
    //    else {
    //        if(rechargeUser === {} || rechargeUser.balance.success === 'true' ){
    //         return  <span>{rechargeUser.balance.data.totalBalance}</span>
    //        }else {
    //         return <span>0.00</span>
    //        }
     
    //    }
    // }
          
    
   
    return (
        <>
 
         <div className="info__section">
             <p>Note: If the recharge amount is deducted but the amount is not added to the account, please send a detailed screenshot of the payment and the game ID to the mailbox for processing.</p>

         </div>
         <h4 className="text-center mt-3 text-danger contact">Any problem ? Contact <span className="text-success">abc@gmail.com</span></h4>
          <h2 className ="text-center balance">Balance:₹ { loading ? <ButtonLoader /> :balance ? balance.data.totalBalance: 0.00} </h2>
           
          <form className="recharge__form">
              <input type="text" placeholder="Please select recharge amount" className="balance__input" value={amounts} onChange={(e)=> setAmounts(e.target.value)} required/>
              <div className="button__container">
              {rechargeBtns.map((rb)=>(
            
                   <Buttons rb={rb} fillForm={fillForm}/>
                  
                 
              ))}
              </div>
              <div className="recharge__btn__container">
              <button type="submit"  onClick={displayRazorpay} className="recharge__btn">Recharge</button>
              </div>
            
          </form>
     
        </>
    )
}

export default Reacharge


