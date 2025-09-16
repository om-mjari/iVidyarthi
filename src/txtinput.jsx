import React, { useState } from 'react'
import './element.css'
const Textinput = (props) => {
    const{value = '' , onTextchange = () => {} , placeholder = 'Enter task'} = props
    return (
        <>
            <form>
                <input value={value} placeholder={placeholder} onChange={onTextchange} className = 'awesome-input' type='text' style={{ padding: '10px' }}></input>
            </form>
        </>
    )
}

export default Textinput