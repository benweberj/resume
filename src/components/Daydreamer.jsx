import React, { useState, useEffect } from 'react'

const Daydreamer = props => {
    const { open=true, children, onClose } = props

    return (
        <div className={`daydreamer ${!open && 'back-to-sleep'}`}>
            <button onClick={onClose} className='daydream-close'>exit</button>
            {children}
        </div>
    )
}

export default Daydreamer