import React, { useState } from 'react'

import BoolToggle from '../components/BoolToggle'

const SketchOptions = props => {
    const { options={}, onChange } = props
    const [closed, setClosed] = useState(false)

    // function toggle(name) {
    //     const curVal = !!options[name]
    //     onChange(name, !curVal)
    // }

    return (
        <>
            <div id='sketch-options' className={closed && 'closed'}>
                {Object.keys(options).map(name => {
                    const val = options[name]
                    if (typeof val === 'boolean') {
                        return <div className='flex split align-center'>
                            <p className='code'>{name}</p>
                            <BoolToggle toggle={() => onChange(name, !val)} on={!!val} />
                        </div>
                    }
                    return <div className='flex split align-center'>
                        <p className='code'>{name}</p>
                        <input onChange={e => onChange(name, e.target.value)} value={val} />
                    </div>
                })}
                <button className='close' onClick={() => setClosed(true)}>close</button>
            </div>

            <img
                src={require('../img/options.png')}
                className={`show-sketch-options ${!closed && 'closed'}`}
                onClick={() => setClosed(false)}
            />

        </>
    )
}

export default SketchOptions