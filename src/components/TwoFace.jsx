import React, { useState, useEffect } from 'react'

import Parallax from './Parallax'


function TwoFace(props) {
    const [real, setReal] = useState(false)
    const [flipping, setFlipping] = useState(false)
    const [showFace, setShowFace] = useState(false)
    const { ready } = props

    function togglePic() {
        setReal(!real)
        setFlipping(true)
    }

    useEffect(() => {
        if (ready) {
            setTimeout(() => {
                setShowFace(true)
            }, .5*1000)
        }
    }, [ready]) 
    
    return (
        <Parallax>
            <div className={`trans ${!showFace && 'shrink'}`}>
                <div
                    className={`${flipping && 'flipping'} trans two-face-container ` + props.className}
                    onClick={togglePic}
                    onAnimationStart={() => setFlipping(true)}
                    onAnimationEnd={() => setFlipping(false)}
                >
                    <img className={`two-face real`} src={require('../img/real.png')} />
                    <img className={`two-face vec ${real ? 'hidden' : ''}`} src={require('../img/vec-t.png')} />
                </div>
            </div>
        </Parallax>
    )
}

export default TwoFace