import React, { useState } from 'react'
import './Tab.css'

const Tab = ({ title, children }) => {
    return (
        <div className='tab'>
            <button>
                {title}
            </button>
        </div>
    )
}

export default Tab