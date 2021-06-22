import './BetModal/BetModal.css';
import {useDispatch} from 'react-redux'


const ModalButton = ({btnNumber, something}) => {
   const dispatch = useDispatch()
    
    return (
        <div>
            <button className="modal__body__btn" onClick={()=>something(btnNumber)} >{btnNumber.number}</button> 
        </div>
    )
}

export default ModalButton
