import React,{useEffect, useState, useRef} from 'react';
import './Game.css';

import {useDispatch, useSelector} from 'react-redux';
import {getColors} from '../../actions/gameActions';
import {getNumbers, getGame,calcResult} from '../../actions/gameActions'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import {useLocation}  from 'react-router-dom';
import socketIOClient from "socket.io-client";
import Colors from '../Colors/Colors';
import BetModal from '../BetModal/BetModal';
import { toast } from 'react-toastify';
import {getBalance} from '../../actions/Recharge'

const CONNECTION_PORT = 'http://localhost:5000/'
const Game = () => {
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [minutess, setMinutess] = useState('00');
    const [secondss, setSecondss] = useState('00');
    let [response, setResponse] = useState('');
    let [date, setDate] = useState('');
    const [games, setGames] = useState(0)
 
    let interval = useRef();
const dispatch = useDispatch();
const history = useHistory();
const location = useLocation()

const getColor = useSelector((state) => state.getColor)
    const {  colors, error, loading } = getColor;

    const getNumber = useSelector((state) => state.getNumber)
    const {numbers} = getNumber;

    const getGames = useSelector((state) => state.getGames)
    const {game} = getGames;
    
    const createBet = useSelector((state) => state.createBet)
    const {betUpdate} = createBet;
    

    const userLogin = useSelector((state) => state.userLogin)
    const {  userInfo } = userLogin

   const getGameTimer = async()=>{
        const res = await axios.get('/api/v1/game/timer');
          const countDownDate = res.data.date;
         setDate(countDownDate)
       
      }
  
    useEffect(()=> {
        if(userInfo){
            dispatch(getColors())
            dispatch(getNumbers())
             dispatch(getGame())
             getGameTimer()
        } else {
            history.push('/login')
        }
     
    },[dispatch, history]);

        // useEffect(()=> {
        //     setInterval(()=> {
        //      dispatch(getGame())
        //     }, 180000);
        // },[dispatch])
       
        // useEffect(()=> {
        //     setInterval(()=> {
        //     getGameTimer()
        //     }, 180000);
        // },[dispatch])
  
     
//    const startTimer = () => {
     
//     const countDownDate = new Date(date).getTime();
//        setTimeout(()=> {

//            const now = new Date().getTime();
//            const distance = countDownDate - now;
        
//      let minutes = Math.floor((distance %(1000 * 60 * 60)) / (1000 *60));
//      let  seconds = Math.floor((distance %(1000 *60))/1000);
//         seconds =seconds < 10 ? '0' + seconds: seconds
//         if(distance < 0){
//           clearInterval(interval.current)
//         }else {
//             setMinutes(minutes);
//             setSeconds(seconds)
//         }
//        },1000)
    
     
//    }

//    useEffect(()=> {
//        startTimer();
//        return ()=>{
//         clearInterval(interval.current);  
//        }
//    },[])



//   startTimer();

//    useEffect(()=> {
//        setTimeout(async()=> {
//         const response = await axios.get(`/api/v1/game`) 
    
//         const config={
//             headers:{
//                 Authorization:`Bearer ${userInfo.token}`
//             }
//         }
//         const result = await axios.get(`/api/v1/game/sendcash/${response.data.game._id}`, config)
//          toast(result.data.message ? result.data.message:"Better luck next time")
//          dispatch(getBalance())
//        },180000)
    
//    },[])


  useEffect(() => {
    const socket = socketIOClient(CONNECTION_PORT);
    socket.on("FromAPI", data => {
      
        setGames(data.game.gamePeriodId)
        let min = Math.floor((data.distance %(1000 * 60 * 60)) / (1000 *60));
      
        setMinutess(min);

        let  sec = Math.floor((data.distance %(1000 *60))/1000);
      
        setSecondss(sec)
    });
  }, []);
  
    return (
        <div className="wrapper">
            {loading ? (
            <h1>Loading...</h1>
            ): error ? (
            <h1>Error</h1>
            ):(
                
               <>
               <div className="first__child">
               <div className="foffchild">
               <h5 className="period">Period</h5>
               <h5 className="gameid">{games}</h5>
               </div>
               <div className="soffchild">
               <h5 className="period">Count Down</h5>
               <h5 className="gameid gameTimer" id="gameid">0{minutess}:{secondss}</h5>
               </div>
               </div>
            <div className="secondChild">
                {colors && (
                  
                    <>
                  
                      {colors.map((color)=>(
                          <div key={color._id}>
                          <Colors color={{...color}}/>
                       
                          </div>
                      ))}
                
                  </>
                )}
               
            </div>
            <div className="thirdChild">
                {numbers && (
                    <>
                  {numbers.map((number)=> (
                    <button type="button" className="num__btn">{number.numbers}</button>
                ))}
                </>
                )}
            
            </div>
            </>
           
 
             
 )}
 
         </div>
       
           
        
    )
}

export default Game

