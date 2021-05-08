import React from 'react'

const Buttons = ({rb, fillForm}) => {

    return (
        <>
               <button className="buttons" id="button" onClick={fillForm}  type="button" >₹ {rb.amount}</button>
        </>
    )
}

export default Buttons
