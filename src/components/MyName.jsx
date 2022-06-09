import React, { useEffect, useState, useRef } from 'react'
import Parallax from './Parallax'

function MyName(props) {
    // initialReady is the global start beacon, but the Web Dev title is going to 
    // appear slightly delayed. initialReady=for name, ready=for title
    const { ready:initialReady } = props
    const [ready, setReady] = useState(false)
    

    const nameRef = useRef()
    const titleRef = useRef()

    const slideDuration = 600

    const nameStyles = !initialReady ? {
        transform: 'perspective(200px) rotateX(-90deg) translateY(50px)',
        opacity: '0',
    } : { transform: 'perspective(300px)', }

    const titleStyles = !ready ? {
        marginTop: -50,
        opacity: 0,
    } : {
        marginTop: -10,
    }

    useEffect(() => {
        if (initialReady && !ready) { // time to start title animation
            setTimeout(() => setReady(true), 1*1000)
        }
    }, [initialReady])

    return (
        <>
            <h1 className='notouch' ref={nameRef} style={{
                ...nameStyles,
                transition: `transform ${slideDuration}ms ease`,
            }}>Ben Weber</h1>

            <h3 ref={titleRef} className='light hazy trans notouch' style={{
                ...titleStyles,
            }}>Web Developer</h3>
        </>

    )
}


export default MyName