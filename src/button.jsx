import React, { useState } from 'react'
import './element.css'
const Button = (props) => {
    const{title = 'add',clickhandler = () => {} , disable = false} = props
    return (
        <>
        <button onClick={clickhandler} className = "awesome-btn" disabled={disable} >{title}</button>
        </> 
    )
}

export default Button