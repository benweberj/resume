import React, { useState, useEffect } from 'react'

import Parallax from './Parallax'
import debounce from 'lodash/debounce'


function TwoFace(props) {
    const [real, setReal] = useState(false)
    const [flipping, setFlipping] = useState(false)
    const [showFace, setShowFace] = useState(false)
    const [shining, setShining] = useState(false)
    const [depth, setDepth] = useState(0)
    const [clicked, setClicked] = useState(false)
    const { ready } = props

    function togglePic() {
        if (!clicked) setClicked(true)
        setReal(!real)
        setFlipping(true)
    }

    useEffect(() => {
        if (ready) {
            setTimeout(() => {
                setShowFace(true)
                // setTimeout()
                // document.addEventListener('mousemove', giveMeJob)
            }, .5*1000)
        }
    }, [ready])

    // function giveMeJob(e) {
    //     if (!clicked) return
    //     let x = e.pageX
    //     let y = e.pageY
    //     let w = window.innerWidth
    //     let h = window.innerHeight
    //     const diffx = x-(w/2)
    //     const diffy = y-(h/2)
    //     // console.log(w, x, w, h)
    //     let dist = Math.sqrt(Math.pow(diffx, 2) + Math.pow(diffy, 2))
    //     setDepth(dist/2)
    // }

    
    return (
        <Parallax fs className='pmb'>
            <div className={`trans ${!showFace && 'shrink'} ${flipping && 'flipping'}`}>
                <div
                    className={`${flipping && 'flipping'} trans two-face-container`}
                    onClick={togglePic}
                    onAnimationStart={() => setFlipping(true)}
                    onAnimationEnd={() => setFlipping(false)}
                >
                    <img className={`two-face real`} src={require('../img/real.png')} />
                    <img className={`two-face vec ${real ? 'hidden' : ''}`} src={require('../img/vec-t.png')} />
                </div>

            </div>
            {depth >0 && <h3 style={{ position: 'absolute',  transform: `translate(45%, -110px) translateZ(${depth}px)`, userSelect: 'none' }}>
                Give me job
            </h3>}
        </Parallax>
    )
}

export default TwoFace