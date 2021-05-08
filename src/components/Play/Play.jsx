import React,{useState} from 'react';
import './Play.css';
import {Link} from 'react-router-dom';
import Game from '../Game/Game'


const Play = () => {
    const [show, setShow] = useState(false);

    const openModal  = () => {
        setShow(!show)
    }
    return (
        <>
          <div className="balance_wrapper">
              <h5 className="balance_data">Available Balance ₹:0.00 </h5>
              <div className="recharge__container">
              <Link to ="/recharge" className="recharge__link">Recharge</Link>
              <button type="button" className="rule__btn" onClick={openModal}>Read Rule</button>
              </div>
        
              
          </div>
          <Game />
       {show && (
         <div className=" rule__modal">
         <div className="modal__header">
             <h2>Rule of Guesses</h2>
             <hr />
         </div>
     
         <div className="modal__content">
             <p>3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to show the lottery result. It opens all day. The total number of trade is 480 issues</p>
<p>If you spend 100 to trade, after deducting 2 service fee, your contract amount is 98:</p>
<p>1. JOIN GREEN: if the result shows 1,3,7,9, you will get (98*2) 196 </p>
<p>If the result shows 5, you will get (98*1.5) 147 </p>
<p>2. JOIN RED: if the result shows 2,4,6,8, you will get (98*2) 196; If the result shows 0, you will get (98*1.5) 147 </p>
<p>3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) 441 </p>
<p>4. SELECT NUMBER: if the result is the same as the number you selected, you will get (98*9) 882</p>
         </div>
         <hr />
         <div className="modal__close">
             <button type="button" onClick={()=>setShow(!show)}>Close</button>
         </div>
        </div> 
       )}
          
        </>
    )
}

export default Play
