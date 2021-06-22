import {useState} from 'react';
import BetModal from '../BetModal/BetModal';
import {useDispatch} from 'react-redux'

const Colors = (props) => {
 
   
 
   const dispatch = useDispatch()
   
   
    const handleClick = (e)=>{
        e.preventDefault();
        
     
        dispatch({
            type:"BET_MODAL_OPEN"
        })
     
       dispatch({
           type:"COLOR_TYPE",
           payload:{
               colorType:props.color.colorName,
               colorId:props.color._id
           }
       })
    }
    return (
        <>
        <div>
        <button className={`color__btns ${props.color.color}`} onClick={handleClick}>Join {props.color.colorName}</button>
        </div>
    
   
        </>
    )
}

export default Colors
