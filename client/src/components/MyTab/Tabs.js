import React, { useState } from 'react'
import Tab from './Tab'

import "./Tabs.css"

const Tabs = ({ children }) => {

    return (
        <div className="tabs">
            {children.map((child, index) => (
                <Tab
                    key={index}
                    title={child.props.title}
                >
                    {child.props.children}
                </Tab>
            ))}
        </div>
    )
}

export default Tabs;