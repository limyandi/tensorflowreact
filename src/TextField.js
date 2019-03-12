import React from 'react'
import './TextField.css'

const TextField = (props) => {
    return (
        <div className='main'>
            <div>{props.label}</div><input type='number' value={props.value} onChange={props.onChange}/>
        </div>
    )
}

export default TextField