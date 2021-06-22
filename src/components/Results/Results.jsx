import React, {useEffect, useState} from 'react'
import {getNumbers, getGame} from '../../actions/gameActions'

import {useDispatch, useSelector} from 'react-redux'
import ButtonLoader from '../ButtonLoader'
import axios from 'axios'
import './Results.css'

const Results = () => {
    const [result,setResult] = useState([]);
    const [game, setGame] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    // const getGames = useSelector((state) => state.getGames)
    // const {loading, game} = getGames;
   
       
//  const getGame =async()=> {
//      const {data}  =await axios.get('/api/v1/game')
//      setGame(data.game)
//  }

//  const getResult =async (id)=> {
     
//         const res= await axios.get(`api/v1/game/getresult/${id}`)
   
//         setResult(res.data.data)     
   
    
//  }
//     useEffect(() => {
        
//             setLoading(true)
//             getGame().then(function(){
               
//                 getResult(game._id)
//             } )
//          setLoading(false)   
        
//       }, [])

      
useEffect(async () => {
    const response = await axios.get(`/api/v1/game`)
    setGame(response.data.game)
    const result = await axios.get(`/api/v1/game/getresult/${response.data.game._id}`)
    setResult(result.data.data)
},[])

    return (
        <div>
       {loading ? <ButtonLoader />:
       <div className="table__container">
      <table className="table__main">
           <tr className="table__row">
               <th className="table__main__head">Period</th>
               <th>Number</th>
               <th>Result</th>
           </tr>
       {result.map((r)=> (
           
          
           <tr className="table__row">
               <td className="table__row__child">{r.gameId.gamePeriodId}</td>
               <td>{r.randnumbers}</td>
               <td>{r.colorId ? r.colorId.colorName ==='green' && <div className="green_unde"></div> || r.colorId.colorName ==="red" && <div className="red__unde"></div>:""}</td>
          </tr>
        
       
           
       ))}
       </table>
       </div>
     
}
      
        </div>
    )
}

export default Results
