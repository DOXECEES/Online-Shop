import React, { useState } from 'react'
import './Tab.css'

const Tab = ({ title, children, press }) => {
    return (
        <div className='tab'>
            <button onClick={press}>
                {title}
            </button>
        </div>
    )
}

export default Tab