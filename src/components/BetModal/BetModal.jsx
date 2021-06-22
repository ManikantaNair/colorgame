import './BetModal.css';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {buttonNumbers} from '../../data'
import ModalButton from '../ModalButton';
import {createBet} from '../../actions/gameActions';
import { getGame} from '../../actions/gameActions'
import {getBalance} from '../../actions/Recharge'

const BetModal = () => {

  const buttonNumber = useSelector((state) => state.buttonNumber)
  const { number} = buttonNumber;

  console.log(number)
 let [count, setCount] = useState(1);
 const [money, setMoney] = useState(count * 10)
  
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getGame())
  }, [])

    const openBetModals = useSelector((state) => state.openBetModals)
    const { openBetModal} = openBetModals;

    const colorTypes = useSelector((state) => state.colorTypes)
    const { colorType, colorId} = colorTypes;

    const getGames = useSelector((state) => state.getGames)
    const {game} = getGames;
   
    //changtocaps
     const changeTocaps =(str) => {
      const capitalized = str.charAt(0).toUpperCase() + str.slice(1)
      return capitalized
     }
     
     const something=(btnNumber)=> {
        
      dispatch({
          type:"NUMBER",
          payload:btnNumber.number
      })
      setMoney( count * btnNumber.number)
 }
 //cancel modal
    const cancelModal = () => {
        dispatch({
          type:"BET_MODAL_CLOSE"
        })
        setCount(count = 1)
        setMoney(count * 10)
    }
    //increment count
    const increment = ()=> {
      setCount(count + 1)
      setMoney((count + 1) * number)
    } 
    
    //decrement count
    const decrement = ()=> {
      if(count > 1){
        setCount(count-1)
        setMoney((count - 1) * number)
      
      }else {
        count = 1
      }
  
    }
    const handleClick = ()=> {
      dispatch(createBet(game._id, money,colorId))
     
      dispatch({
        type:"BET_MODAL_CLOSE"
      })
      dispatch(getBalance())
    }
    return (
        <div
        className={`${
          openBetModal ? 'modal__overlay show_modal' : 'modal__overlay'
        }`}
      >
            <div className="modal__containers">
           
            <div className={`modal__top ${colorType}`}>
            <h2 className='modal_top__child'>Join {changeTocaps(colorType)}</h2>
            </div>
            <div className="modal__body">
             <p>Contract Money</p>
             <div className="modal__btn__container">
               {buttonNumbers.map((btnNumber)=> (
                  <ModalButton btnNumber={btnNumber} something={something}/>
               ))}
          
          
             </div>
             <p className="modal__number">Number</p>
             <div className="modal__number__container">
               <div className="number__child" onClick={decrement} >
               <i className="fa fa-minus"></i>
               </div>
               <h4 className="modal__number__child">{count}</h4>
               <div className="number__child cool" onClick={increment}>
               <i className="fa fa-plus "></i>
               </div>
             </div>
             <p className="modal__number">Total Contract Money is {money}</p>
             
             <input type="checkbox" /> <span>I agree PREUSABLE RULE</span>
            </div>
            <div className="modal__footer">
            <button className="modal__footer__btn" onClick={cancelModal}>Cancel</button>
            <button className="modal__footer__btn confirm" onClick={handleClick}>Confirm</button>
            </div>
            </div>
         
        </div>
    )
}

export default BetModal

